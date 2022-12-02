const express = require('express');
const { trainerController } = require('../controller');
const { trainerValidator } = require('../validators');

const router = express.Router();

router.post('/', trainerValidator.createTrainerValidator, trainerController.signUpTrainer);

router.post('/signIn', trainerValidator.createTrainerValidator, trainerController.signIn);

module.exports = router;
