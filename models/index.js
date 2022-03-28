'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.jobs.hasMany(db.user, {
  foreignKey: 'id',
  targetKey: 'userId',
  sourceKey: 'userId',
});

db.user.belongsTo(db.jobs, {
  foreignKey: 'userId',
  targetKey: 'id',
  sourceKey: 'id',
});

db.jobs.hasMany(db.applications, {
  foreignKey: 'Jobid',
  targetKey: 'Jobid',
  sourceKey: 'id',
});

db.applications.belongsTo(db.jobs, {
  foreignKey: 'id',
  targetKey: 'id',
  sourceKey: 'id',
});


db.applications.belongsTo(db.user, {
  foreignKey: 'user_id',
  targetKey: 'id',
  sourceKey: 'id',
});

db.user.belongsTo(db.jobs, {
  foreignKey: 'id',
  targetKey: 'id',
  sourceKey: 'id',
});


db.user.hasMany(db.Skills, {
  foreignKey: 'ref_id',

});

db.Skills.belongsTo(db.user, {
  foreignKey: 'id',

});

db.jobs.hasMany(db.Skills, {
  foreignKey: 'ref_id',

});

db.Skills.belongsTo(db.jobs, {
  foreignKey: 'id',

});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
