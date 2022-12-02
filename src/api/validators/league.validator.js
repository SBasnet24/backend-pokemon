const Joi = require('joi');

const createPokemonValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().label('Title').required(),
    location: Joi.string().label('Location').required(),
    terrain: Joi.string().label('Terrain').required(),
    numberOfSlots: Joi.number().label('Number Of Slots').required(),
    statLimit: Joi.number().label('Stat Limit').required(),
  }).unknown(true);

  const { error } = schema.validate(req.body);
  return error ? next(error) : next();
};

module.exports = {
  createPokemonValidator,
};
