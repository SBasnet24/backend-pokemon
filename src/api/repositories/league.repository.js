const { League } = require('../../models');

const findLeague = (condtions, options = {}) =>
  League.findOne({
    where: condtions,
    ...options,
  });

const createLeague = (trainer) => League.create(trainer);

const findLeagueByTrainerId = (trainerId, options = {}) =>
  League.findAll({
    where: {
      trainerId,
    },
    ...options,
  });

const findLeagues = (condtions, options = {}) =>
  League.findAll({
    where: condtions,
    ...options,
  });

module.exports = {
  findLeague,
  createLeague,
  findLeagueByTrainerId,
  findLeagues,
};
