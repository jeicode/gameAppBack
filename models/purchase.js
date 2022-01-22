const { DataTypes } = require('sequelize');
const db = require('../db/config')


const Purchase = db.define('Purchase', {

    number_copies_purchased: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    date_purchase: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    
    }, {
    // Other model options go here
});

   
module.exports = Purchase;