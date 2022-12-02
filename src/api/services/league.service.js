const HTTP_STATUS_CODES = require('../constants/httpErrorCode');
const APIError = require('../errors/apiError');
const { leagueRepository } = require('../repositories');
const { Slot, SlottedPokemon, Pokemon, SlotStat, Participant, Trainer } = require('../../models');
const API_ERROR_MSG = require('../constants/apiErrorMessage');

const LeagueIncludes = [
  {
    model: Participant,
    as: 'participants',
    include: [
      {
        model: Slot,
        as: 'slots',
        include: [
          {
            model: SlotStat,
            as: 'slotStat',
          },
          {
            model: SlottedPokemon,
            as: 'slottedPokemon',
            include: [
              {
                model: Pokemon,
                as: 'pokemon',
              },
            ],
          },
        ],
      },
      {
        model: Trainer,
        as: 'trainer',
      },
    ],
  },
];

const createLeague = async ({
  title,
  location,
  terrain,
  numberOfSlots,
  statLimit,
  trainerId,
  leagueStartDate,
}) => {
  const leagueExists = await leagueRepository.findLeague({
    title,
    trainerId,
  });

  if (leagueExists) {
    throw new APIError(HTTP_STATUS_CODES.BAD_REQUEST, API_ERROR_MSG.LEAGUE_ALREADY_EXISTS);
  }
  const league = await leagueRepository.createLeague({
    title,
    location,
    terrain,
    numberOfSlots,
    statLimit,
    trainerId,
    leagueStartDate: new Date(leagueStartDate),
  });
  return league;
};

const getLeagues = async () => {
  const leagues = await leagueRepository.findLeagues({}, { include: LeagueIncludes });
  return leagues;
};

const getTrainersLeague = async (trainerId) => {
  const leagues = await leagueRepository.findLeagueByTrainerId(trainerId);
  return leagues;
};

const getLeagueDetails = async (leagueId) => {
  const league = await leagueRepository.findLeague(
    { id: leagueId },
    {
      include: LeagueIncludes,
    }
  );
  return league;
};

module.exports = {
  createLeague,
  getTrainersLeague,
  getLeagueDetails,
  getLeagues,
};
