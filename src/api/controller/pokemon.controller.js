const HTTP_STATUS_CODES = require('../constants/httpErrorCode');
const { pokemonService } = require('../services');

const createPokemon = async (req, res, next) => {
  try {
    const { name, type, attack, defense, speed } = req.body;
    const { id: trainerId } = req.trainer;

    const pokemon = await pokemonService.createPokemon({
      name,
      type,
      attack,
      defense,
      speed,
      trainerId,
    });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      pokemon,
    });
  } catch (err) {
    next(err);
  }
};

const getPokemons = async (req, res, next) => {
  try {
    const { id } = req.trainer;
    const pokemons = await pokemonService.getTrainersPokemon(id);

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      pokemons,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPokemon,
  getPokemons,
};
