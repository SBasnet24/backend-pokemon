const API_ERROR_MSG = require('../constants/apiErrorMessage');
const HTTP_STATUS_CODES = require('../constants/httpErrorCode');
const APIError = require('../errors/apiError');
const { trainerRepository } = require('../repositories');
const { hashPassword, comparePasswords, createJWT } = require('./auth.service');

const createTrainer = async ({ username, password }) => {
  const trainerExists = await trainerRepository.findTrainer({
    username,
  });
  if (trainerExists) {
    throw new APIError(HTTP_STATUS_CODES.BAD_REQUEST, API_ERROR_MSG.TRAINER_ALREADY_EXISTS);
  }
  const trainer = await trainerRepository.createTrainer({
    username,
    password: await hashPassword(password),
  });
  return trainer;
};

const getValidTrainerWithToken = async (username, password) => {
  const trainer = await trainerRepository.findTrainerWithPassword({
    username,
  });
  if (!trainer) {
    throw new APIError(HTTP_STATUS_CODES.UNAUTHORIZED, API_ERROR_MSG.INVALID_CREDENTIALS);
  }
  const isValidPassword = await comparePasswords(password, trainer.password);

  if (!isValidPassword) {
    throw new APIError(HTTP_STATUS_CODES.NAUTHORIZED, API_ERROR_MSG.INVALID_CREDENTIALS);
  }
  const token = createJWT(trainer);
  return { token, trainer };
};

module.exports = {
  createTrainer,
  getValidTrainerWithToken,
};
