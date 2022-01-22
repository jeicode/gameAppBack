const { DataTypes } = require('sequelize');
const db = require('../db/config')


const Inventory = db.define('Inventory', {
    // Model attributes are defined here
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    units_avaible: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    
    }, {
    // Other model options go here
});
  
   
module.exports = Inventory;