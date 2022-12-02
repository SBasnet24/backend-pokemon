module.exports = (sequelize, DataTypes) => {
  const League = sequelize.define('league', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    terrain: {
      type: DataTypes.STRING,
    },
    leagueStartDate: {
      type: DataTypes.DATE,
    },
    numberOfSlots: {
      type: DataTypes.INTEGER,
    },
    statLimit: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  return League;
};
