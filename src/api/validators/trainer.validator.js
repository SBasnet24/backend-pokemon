const Joi = require('joi');

const createTrainerValidator = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().label('Username').required(),
    password: Joi.string().label('Password').required(),
  }).unknown(true);

  const { error } = schema.validate(req.body);
  return error ? next(error) : next();
};

module.exports = {
  createTrainerValidator,
};
