const db = require('../../models');
const { Slot, SlotStat, SlottedPokemon, Participant } = require('../../models');

const { getLeagueDetails } = require('./league.service');
const APIError = require('../errors/apiError');
const HTTP_STATUS_CODES = require('../constants/httpErrorCode');
const API_ERROR_MSG = require('../constants/apiErrorMessage');
const { findPokemonAndStats } = require('./pokemon.service');
const ValidationError = require('../errors/validationError');
const {
  checkIfPokemonsInSlotsAreValid,
  checkIfTrainerAlreadyParticipated,
  checkIfMaximumSlotExceeded,
} = require('../utils/check');

const fillLeagueSlots = async ({ leagueId, slots, trainerId }) => {
  const league = await getLeagueDetails(leagueId);
  if (!league) {
    throw new APIError(HTTP_STATUS_CODES.BAD_REQUEST, API_ERROR_MSG.NO_LEAGUE);
  }
  const { participants, numberOfSlots, statLimit } = league;
  const hasAlreadyParticipated = checkIfTrainerAlreadyParticipated(participants, trainerId);

  if (hasAlreadyParticipated) {
    throw new APIError(HTTP_STATUS_CODES.BAD_REQUEST, API_ERROR_MSG.ALREDY_PARTICIPATED);
  }

  if (slots.length > numberOfSlots) {
    throw new APIError(HTTP_STATUS_CODES.BAD_REQUEST, API_ERROR_MSG.SLOTS_ALREADY_FILLED);
  }

  const { valid, err } = await checkIfMaximumSlotExceeded(slots, statLimit);
  if (!valid && err) {
    throw new APIError(HTTP_STATUS_CODES.BAD_REQUEST, err);
  }
  const { slotErrMsg } = checkIfPokemonsInSlotsAreValid(slots);

  if (Object.keys(slotErrMsg).length > 0) {
    throw new ValidationError(HTTP_STATUS_CODES.BAD_REQUEST, 'Validation err', slotErrMsg);
  }

  const t = await db.sequelize.transaction();
  try {
    const participant = await Participant.create(
      {
        leagueId: league.id,
        trainerId,
      },
      { transaction: t }
    );

    const buildSlots = slots.map(() => ({
      participantId: participant.id,
    }));

    const insertedSlots = await Slot.bulkCreate(buildSlots, { transaction: t });

    const promises = [];

    const allPokemonStats = await Promise.all(
      slots.map(async (slot, index) => {
        const { pokemons, stats: currentPokemonStats } = await findPokemonAndStats(slot.pokemonIds);
        return { id: index, pokemons, currentPokemonStats };
      })
    );

    for (const [index, value] of insertedSlots.entries()) {
      const { pokemonIds } = slots[index];
      const { pokemons, currentPokemonStats } = allPokemonStats.find((stat) => stat.id === index);

      promises.push(
        SlotStat.create(
          {
            slotId: value.id,
            attack: currentPokemonStats.attack,
            defense: currentPokemonStats.defense,
            speed: currentPokemonStats.speed,
          },
          { transaction: t }
        )
      );

      const slottedPokemons = pokemons.map((pokemon) => ({
        pokemonId: pokemon.id,
        slotId: value.id,
        type: pokemonIds.length === 1 ? 'single' : 'pair',
      }));

      promises.push(SlottedPokemon.bulkCreate(slottedPokemons, { transaction: t }));
    }

    await Promise.all(promises);
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
  return league;
};

module.exports = {
  fillLeagueSlots,
};
