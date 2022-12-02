const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../../config/db.config')[env];

const sequelize = new Sequelize(
  process.env.DB_NAME || dbConfig.database,
  process.env.DB_USERNAME || dbConfig.username,
  process.env.DB_PASSWORD || dbConfig.password,
  {
    dialect: dbConfig.dialect,
    host: process.env.DB_URL || dbConfig.host,
    port: dbConfig.port || 3306,
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Slot = require('./Slot')(sequelize, Sequelize);
db.League = require('./League')(sequelize, Sequelize);
db.Pokemon = require('./Pokemon')(sequelize, Sequelize);
db.Trainer = require('./Trainer')(sequelize, Sequelize);
db.SlottedPokemon = require('./SlottedPokemon')(sequelize, Sequelize);
db.SlotStat = require('./SlotStat')(sequelize, Sequelize);
db.Participant = require('./Participant')(sequelize, Sequelize);

db.Trainer.hasMany(db.Pokemon, { as: 'pokemons' });
db.Pokemon.belongsTo(db.Trainer, {
  foreignKey: 'trainerId',
  as: 'trainer',
});

// league and trainer
db.Trainer.hasMany(db.League, { as: 'League' });
db.League.belongsTo(db.Trainer, {
  foreignKey: 'trainerId',
  as: 'trainerCreator',
});

db.League.hasMany(db.Participant, { as: 'participants' });
db.Participant.belongsTo(db.League, { as: 'league' });

db.Trainer.hasMany(db.Participant, { as: 'participants' });
db.Participant.belongsTo(db.Trainer, { as: 'trainer' });

// // league and slots
db.Participant.hasMany(db.Slot, { as: 'slots' });
db.Slot.belongsTo(db.Participant, {
  as: 'participant',
});

// SlottedPokemon and pokemon
db.SlottedPokemon.belongsTo(db.Pokemon, {
  foreignKey: 'pokemonId',
  as: 'pokemon',
});

// SlottedPokemon and slot
db.Slot.hasMany(db.SlottedPokemon, { as: 'slottedPokemon' });
db.SlottedPokemon.belongsTo(db.Slot, {
  foreignKey: 'slotId',
  as: 'slot',
});

db.Slot.hasOne(db.SlotStat);
db.SlotStat.belongsTo(db.Slot);

module.exports = db;
