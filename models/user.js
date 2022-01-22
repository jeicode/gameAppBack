const { DataTypes } = require('sequelize');
const db = require('../db/config')

const Purchase = require('../models/purchase');
const Game = require('./game');
const Inventory = require('./inventory');

const User = db.define('User', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    is_seller: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    
  }, {
    // Other model options go here
  });

  User.hasMany(Purchase, { foreignKey: 'seller_id', sourceKey: 'id'}) 
  Purchase.belongsTo(User, { foreignKey: 'seller_id', sourceKey: 'id'})

  User.hasMany(Purchase, { foreignKey: 'buyer_id', sourceKey: 'id'})
  Purchase.belongsTo(User, { foreignKey: 'buyer_id', sourceKey: 'id'})

  User.hasMany(Game, { foreignKey: 'offered_by', sourceKey: 'id'}) 
  Game.belongsTo(User, { foreignKey: 'offered_by', sourceKey: 'id'})


  User.hasMany(Inventory, { foreignKey: 'owner_id', sourceKey: 'id'})
  Inventory.belongsTo(User, { foreignKey: 'owner_id', sourceKey: 'id'})


  module.exports = User;