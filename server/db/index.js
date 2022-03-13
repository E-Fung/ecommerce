'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const modelDir = `${__dirname}/models`;
const db = {};
const { applyExtraSetup } = require('./extra-setup');

require('dotenv').config();

let sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  logging: false,
});

//define all the models
fs.readdirSync(modelDir)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(modelDir, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

//apply model associations
applyExtraSetup(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
