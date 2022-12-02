module.exports = (sequelize, DataTypes) =>
  sequelize.define('slottedPokemon', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('single', 'pair'),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
