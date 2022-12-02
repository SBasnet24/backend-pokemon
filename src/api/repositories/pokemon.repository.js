const { Pokemon } = require('../../models');

const findPokemon = (condtions, options = {}) =>
  Pokemon.findOne({
    where: condtions,
    ...options,
  });

const createPokemon = (trainer) => Pokemon.create(trainer);

const findTrainersPokemon = (trainerId, options = {}) =>
  Pokemon.findAll({
    where: {
      trainerId,
    },
    ...options,
  });

const findAllPokemons = (conditions, options = {}) =>
  Pokemon.findAll({
    where: conditions,
    ...options,
  });

module.exports = {
  findPokemon,
  createPokemon,
  findTrainersPokemon,
  findAllPokemons,
};
