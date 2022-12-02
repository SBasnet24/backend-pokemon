const express = require('express');
const { leagueController } = require('../controller');
const { leagueValidator } = require('../validators');

const router = express.Router();

router.post('/', leagueValidator.createPokemonValidator, leagueController.createLeague);
router.get('/', leagueController.getLeagues);
router.get('/:id', leagueController.getLeagueDetails);

module.exports = router;
