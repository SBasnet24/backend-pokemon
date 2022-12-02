module.exports = (sequelize, DataTypes) =>
  sequelize.define('pokemon', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
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
