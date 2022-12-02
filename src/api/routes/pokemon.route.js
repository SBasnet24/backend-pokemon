const express = require('express');
const { pokemonController } = require('../controller');
const { pokemonValidator } = require('../validators');

const router = express.Router();

router.post('/', pokemonValidator.createPokemonValidator, pokemonController.createPokemon);
router.get('/', pokemonController.getPokemons);

module.exports = router;
