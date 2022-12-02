const express = require('express');
const { slotController } = require('../controller');
const { slotValidator } = require('../validators');

const router = express.Router();

router.post('/', slotValidator.fillSlotsValidator, slotController.fillSlot);

module.exports = router;
