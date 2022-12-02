const express = require('express');

const router = express.Router();

const pokemonRoutes = require('./pokemon.route');
const leagueRoutes = require('./league.route');
const trainerRoutes = require('./trainer.route');
const slotRoutes = require('./slot.route');
const protect = require('../middlewares/authentication');

router.use('/pokemon', protect, pokemonRoutes);
router.use('/league', protect, leagueRoutes);
router.use('/trainer', trainerRoutes);
router.use('/slot', protect, slotRoutes);

module.exports = router;
