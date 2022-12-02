const { findPokemonStat } = require('../services/pokemon.service');
const { arrayEquals } = require('./array');

const checkIfPokemonsInSlotsAreValid = (slots) => {
  const validSlots = [];
  let slotErrMsg = {};

  for (const slot of slots) {
    const existsAlready = validSlots.find((sl) => arrayEquals(sl, slot.pokemonIds));
    if (existsAlready) {
      slotErrMsg = {
        ...slotErrMsg,
        [slot.id]: {
          errorMessage: `Same pokemon ${slot.slotType === 'pair' ? 'Pairy' : 'Singly'} Slotted`,
        },
      };
    } else {
      validSlots.push(slot.pokemonIds);
    }
  }
  return { slotErrMsg };
};

const checkIfTrainerAlreadyParticipated = (participants, trainerId) =>
  !!participants.find((participant) => participant.trainerId === trainerId);

const checkIfMaximumSlotExceeded = async (slots, maxLimit) => {
  const allPokemonStats = await Promise.all(
    slots.map(async (slot) => {
      const totalStats = await findPokemonStat(slot.pokemonIds);
      return { id: slot.id, totalStats };
    })
  );

  for (const slot of slots) {
    const { totalStats } = allPokemonStats.find((stat) => stat.id === slot.id);
    if (totalStats > maxLimit) {
      return {
        valid: false,
        error: `Maximum SlotStat limit for Slot ${
          slot.id + 1
        } exceeded, should be less than ${maxLimit}`,
      };
    }
  }
  return { valid: true };
};

module.exports = {
  checkIfPokemonsInSlotsAreValid,
  checkIfTrainerAlreadyParticipated,
  checkIfMaximumSlotExceeded,
};
