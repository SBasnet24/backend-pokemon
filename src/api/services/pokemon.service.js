const { Op } = require('sequelize');
const API_ERROR_MSG = require('../constants/apiErrorMessage');
const HTTP_STATUS_CODES = require('../constants/httpErrorCode');
const APIError = require('../errors/apiError');
const { pokemonRepository } = require('../repositories');

const createPokemon = async ({ name, type, defense, speed, trainerId, attack }) => {
  const pokemonExists = await pokemonRepository.findPokemon({
    name,
    trainerId,
  });

  if (pokemonExists) {
    throw new APIError(HTTP_STATUS_CODES.BAD_REQUEST, API_ERROR_MSG.POKEMON_ALREADY_EXISTS);
  }
  const pokemon = await pokemonRepository.createPokemon({
    name,
    type,
    defense,
    speed,
    trainerId,
    attack,
  });
  return pokemon;
};

const getTrainersPokemon = async (trainerId) => {
  const pokemons = await pokemonRepository.findTrainersPokemon(trainerId);
  return pokemons;
};

const findPokemonAndStats = async (pokemonIds) => {
  const pokemons = await pokemonRepository.findAllPokemons({
    id: { [Op.and]: [pokemonIds] },
  });
  const stats = { attack: 0, defense: 0, speed: 0 };
  if (pokemons.length === 0) {
    return { pokemons, totalStats: 0 };
  }
  pokemons.forEach((pokemon) => {
    stats.attack += pokemon.attack;
    stats.defense += pokemon.defense;
    stats.speed += pokemon.speed;
  }, 0);
  return { stats, pokemons };
};

const findPokemonStat = async (pokemonIds) => {
  const pokemons = await pokemonRepository.findAllPokemons({
    id: { [Op.and]: [pokemonIds] },
  });
  if (pokemons.length === 0) {
    return { pokemons, totalStats: 0 };
  }
  const totalStats = pokemons.reduce((total, pokemon) => {
    const sum = total + parseInt(pokemon.totalStats, 10);
    return sum;
  }, 0);
  return totalStats;
};

module.exports = {
  createPokemon,
  getTrainersPokemon,
  findPokemonAndStats,
  findPokemonStat,
};
