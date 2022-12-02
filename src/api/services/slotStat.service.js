const { Op } = require('sequelize');
const { slotStatRepository } = require('../repositories');

const getTotalSlotStats = async (slotIds) => {
  const slotStats = await slotStatRepository.findAllSlotStats({
    slotId: { [Op.and]: [slotIds] },
  });
  const totalStats = (slotStats || []).reduce((total, slot) => {
    const sum = total + parseInt(slot.totalStats, 10);
    return sum;
  }, 0);
  return totalStats;
};

module.exports = {
  getTotalSlotStats,
};
