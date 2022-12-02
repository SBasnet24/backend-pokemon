const Constants = require('../constants/constants');
const HTTP_STATUS_CODES = require('../constants/httpErrorCode');
const { leagueService } = require('../services');

const createLeague = async (req, res, next) => {
  try {
    const { title, location, terrain, numberOfSlots, statLimit, leagueStartDate } = req.body;
    const { id: trainerId } = req.trainer;

    const league = await leagueService.createLeague({
      title,
      location,
      terrain,
      numberOfSlots,
      statLimit,
      trainerId,
      leagueStartDate,
    });

    res.status(HTTP_STATUS_CODES.OK).json({
      type: Constants.success,
      league,
    });
  } catch (err) {
    next(err);
  }
};

const getLeagueDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const league = await leagueService.getLeagueDetails(id);

    res.status(HTTP_STATUS_CODES.OK).json({
      type: Constants.success,
      league,
    });
  } catch (error) {
    next(error);
  }
};
const getLeagues = async (req, res, next) => {
  try {
    const leagues = await leagueService.getLeagues();

    res.status(HTTP_STATUS_CODES.OK).json({
      type: Constants.success,
      leagues,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLeague,
  getLeagueDetails,
  getLeagues,
};
