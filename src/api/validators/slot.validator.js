const Joi = require('joi');

const fillSlotsValidator = (req, res, next) => {
  const schema = Joi.object({
    leagueId: Joi.number().label('LeagueId is required').required(),
    slots: Joi.array().label('Slots is required').required(),
  }).unknown(true);

  const { error } = schema.validate(req.body);
  return error ? next(error) : next();
};

module.exports = {
  fillSlotsValidator,
};
