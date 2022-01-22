const { Sequelize } = require('sequelize');

const {NAME_DB, USER_DB, PASS_DB} = process.env;


const db = new Sequelize(NAME_DB, USER_DB, PASS_DB, {
    host: 'localhost', 
    dialect: 'mysql',
    dialectOptions: {
        socketPath: "/var/run/mysqld/mysqld.sock"
    },
    logging: false
})



module.exports = db

