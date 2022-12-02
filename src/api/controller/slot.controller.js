const HTTP_STATUS_CODES = require('../constants/httpErrorCode');
const { slotService } = require('../services');

const fillSlot = async (req, res, next) => {
  try {
    const { leagueId, slots } = req.body;
    const { id: trainerId } = req.trainer;
    await slotService.fillLeagueSlots({ leagueId, slots, trainerId });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: 'Slots filled successfully',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fillSlot,
};
