const jwt = require('jsonwebtoken');
const API_ERROR_MSG = require('../constants/apiErrorMessage');
const { UNAUTHORIZED } = require('../constants/httpErrorCode');
const APIError = require('../errors/apiError');
const { trainerRepository } = require('../repositories');

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    throw new APIError(UNAUTHORIZED, API_ERROR_MSG.UNAUTHORIZED);
  }
  const [, token] = bearer.split(' ');

  if (!token) {
    throw new APIError(UNAUTHORIZED, API_ERROR_MSG.NO_TOKEN);
  }

  try {
    const trainer = jwt.verify(token, process.env.JWT_SECRET);
    const isValidTrainer = await trainerRepository.findTrainer(trainer.id);
    if (!isValidTrainer) {
      throw new APIError(UNAUTHORIZED, API_ERROR_MSG.TRAINER_NOT_VALID);
    }
    req.trainer = trainer;
    next();
  } catch (e) {
    throw new APIError(UNAUTHORIZED, API_ERROR_MSG.TOKEN_INVALID);
  }
};

module.exports = protect;
