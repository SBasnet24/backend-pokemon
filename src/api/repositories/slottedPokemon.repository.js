const { Op } = require('sequelize');
const { SlottedPokemon } = require('../../models');

const findSlottedPokemon = (condtions, options = {}) =>
  SlottedPokemon.findOne({
    where: condtions,
    ...options,
  });

const createSlottedPokemon = (slottedPokemon) => SlottedPokemon.create(slottedPokemon);

const findSlottedPokemonByIds = (ids) =>
  SlottedPokemon.findAll({
    where: {
      pokemonId: { [Op.in]: ids },
    },
    raw: true,
  });

module.exports = {
  findSlottedPokemon,
  createSlottedPokemon,
  findSlottedPokemonByIds,
};
