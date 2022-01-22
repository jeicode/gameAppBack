const { DataTypes } = require('sequelize');
const db = require('../db/config');
const Game = require('./game');

const Company = db.define('Company', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    
    start_year_activities: {
        type: DataTypes.STRING(4),
        allowNull: false,
    },
    
    NIT: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },

    
  }, {
    // Other model options go here
  });

  Company.hasMany(Game, {foreignKey: 'company_id', sourceKey: 'id'})
  Game.belongsTo(Company, {foreignKey: 'company_id', sourceKey: 'id'})

  module.exports = Company;