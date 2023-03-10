var Sequelize = require('sequelize');
var config = require('../Config');

/// Sequelize to connect the DB
var sequelize = new Sequelize(config.dbConn.dbName, config.dbConn.dbUser, config.dbConn.dbPassword, {
    host: config.dbConn.dbServer,
    dialect: "mysql",
    port: 3306,
    logging: false,
    define: {
        timestamps: false,
    },
    timezone: "Asia/Kolkata"
});

var Op = Sequelize.Op;

module.exports = {sequelize: sequelize, Op: Op, Sequelize: Sequelize};
