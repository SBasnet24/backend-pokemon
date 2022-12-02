const Joi = require('joi');

const createPokemonValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().label('Name').required(),
    type: Joi.string().label('Type').required(),
    attack: Joi.number().label('Attack').required(),
    defense: Joi.number().label('Defense').required(),
    speed: Joi.number().label('Speed').required(),
  }).unknown(true);

  const { error } = schema.validate(req.body);
  return error ? next(error) : next();
};

module.exports = {
  createPokemonValidator,
};
