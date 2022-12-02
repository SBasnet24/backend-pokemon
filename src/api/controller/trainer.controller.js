const Constants = require('../constants/constants');
const HTTP_STATUS_CODES = require('../constants/httpErrorCode');
const { trainerService, authService } = require('../services');

const signUpTrainer = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const trainer = await trainerService.createTrainer({
      username,
      password,
    });
    const token = authService.createJWT(trainer);
    res.status(HTTP_STATUS_CODES.OK).json({
      type: Constants.success,
      token,
      trainer,
    });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { token, trainer } = await trainerService.getValidTrainerWithToken(username, password);
    res.status(HTTP_STATUS_CODES.OK).json({
      type: Constants.success,
      token,
      trainer,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUpTrainer,
  signIn,
};
