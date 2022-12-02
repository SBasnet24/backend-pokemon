const { Slot } = require('../../models');

const findSlot = (condtions, options = {}) =>
  Slot.findOne({
    where: condtions,
    ...options,
  });

const createSlot = (slot) => Slot.create(slot);

const findAllTrainerSlots = (trainerId) =>
  Slot.findAll({
    where: {
      trainerId,
    },
  });

module.exports = {
  findSlot,
  createSlot,
  findAllTrainerSlots,
};
