require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;
const db = require('./src/models/index');

const env = process.env.NODE_ENV;

const config = require('./config/db.config')[env];

db.sequelize.authenticate().then(() => {
  console.log(`env: ${env}`);
  console.log(`Host: ${config.host}`);
  console.log(`Name: ${config.database}`);
  console.log(`User: ${config.username}`);
  console.log(`Port: ${config.port}`);
  console.log('Connection has been established successfully.');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
