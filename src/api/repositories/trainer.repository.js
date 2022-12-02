const { Trainer } = require('../../models');

const findTrainer = (condtions, options = {}) =>
  Trainer.findOne({
    where: condtions,
    ...options,
  });

const findTrainerWithPassword = (condtions, options = {}) =>
  Trainer.scope('withPassword').findOne({
    where: condtions,
    ...options,
  });

const createTrainer = (trainer) => Trainer.create(trainer);

module.exports = {
  findTrainer,
  createTrainer,
  findTrainerWithPassword,
};
