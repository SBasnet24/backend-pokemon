module.exports = (sequelize, DataTypes) =>
  sequelize.define('slotStats', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    totalStats: {
      type: DataTypes.VIRTUAL,
      get() {
        const sum =
          this.getDataValue('speed') + this.getDataValue('attack') + this.getDataValue('defense');
        return sum;
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
