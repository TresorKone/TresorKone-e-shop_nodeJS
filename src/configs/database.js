const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('e-shop_nodejs', 'root', 'databasesql', {
    host: 'localhost',
    dialect: 'mariadb'
});

module.exports = sequelize;