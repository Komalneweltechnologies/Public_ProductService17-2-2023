var connect = require('./Connect');
var datamodel = require('./DataModel');
var dataaccess = require('./DataAccess');

/// CheckConnection function used to check a database connection using API
module.exports.CheckConnection = function (res) {
    connect.sequelize
        .authenticate()
        .then(function (result) {
            res.status(200).json({ Success: true, Message: 'Connection has been establised successfully', Data: null });
        }, function (err) {
            res.status(200).json({ Success: false, Message: 'Unable to connect to the database : ' + err, Data: null });
        });
}

/// CreateTable function used to create Database tables using API
module.exports.CreateTable = function (res) {
datamodel.tbl_product();
    connect.sequelize.sync()
        .then(() => {
            res.status(200).json({ Success: true, Message: 'Tables updated', Data: null });
        })
}

