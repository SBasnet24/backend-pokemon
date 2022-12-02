const { SlotStats } = require('../../models');

const findSlot = (condtions, options = {}) =>
  SlotStats.findOne({
    where: condtions,
    ...options,
  });

const createSlot = (slot) => SlotStats.create(slot);

const findAllSlotStats = (condtions, options = {}) =>
  SlotStats.findAll({
    where: condtions,
    ...options,
  });

module.exports = {
  findSlot,
  createSlot,
  findAllSlotStats,
};
