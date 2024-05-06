const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const tokocinasSchema = require('./tokocinas-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));
const Tokocina = mongoose.model('tokocinas', mongoose.Schema(tokocinasSchema));
module.exports = {
  mongoose,
  User,
  Tokocina,
};
