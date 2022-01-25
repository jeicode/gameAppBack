const { DataTypes } = require('sequelize');
const db = require('../db/config')

const Inventory = require('./inventory');
const Purchase = require('./purchase');

const Game = db.define('Game', {
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    img: {
        type: DataTypes.STRING(1500),

    },

    departure_date: {
        type: DataTypes.DATE,
    },

    platform:  {
        type: DataTypes.STRING(100),
    },

    price:  {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    offered_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

    
    }, {
    // Other model options go here
});


Game.hasMany(Purchase, { foreignKey: 'game_id', sourceKey: 'id'})
Purchase.belongsTo(Game, { foreignKey: 'game_id', sourceKey: 'id'})

Game.hasMany(Inventory, { foreignKey: 'game_id', sourceKey: 'id'})
Inventory.belongsTo(Game, { foreignKey: 'game_id', sourceKey: 'id'})

   
module.exports = Game;