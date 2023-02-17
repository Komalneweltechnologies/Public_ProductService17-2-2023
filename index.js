var dataconn = require('./Data/DataConnection');
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var config = require('./Config');
//var cron = require('./CronScheduler/RunScheduler');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// CORS Middleware node.js package for connect express
app.use(function (req, res, next) {
    var menthods = "GET, POST";
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", menthods);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
    if (!menthods.includes(req.method.toUpperCase())) {
        return res.status(200).json({});
    };
    next();
});

// Service checking method
app.get("/sample", function (req, res) {
    res.status(200).json({ Success: true, Message: "Welcome Hello ", Data: null });
});

// Connection checking method
app.get("/CheckConnection", function (req, res) {
    dataconn.CheckConnection(res);
});

//Table creation Method
app.get("/CreateTable", function (reg, res) {
    dataconn.CreateTable(res);
});

var productService = require('../Product_Service/Product/productAPI')();
app.use("/product", productService);

// app.post('/upload', (req, res) => {
//     // Get the file that was set to our field named "image"
//     const { image } = req.files;

//     // If no image submitted, exit
//     if (!image) return res.sendStatus(400);

//     // If does not have image mime type prevent from uploading
//     // if (/^image/.test(image.mimetype)) return res.sendStatus(400);

//     // Move the uploaded image to our upload folder
//     image.mv(__dirname + '/upload/' + image.name);

//     // All good
//     res.sendStatus(200);
// });
////#endregion

// Start server and listen on http://localhost:1339/
var server = app.listen(config.service_port, function () {
    var host = server.address().address;
    var port = server.address().port;
    var datetime = new Date();
    var message = "Server :- " + host + " running on Port : - " + port + " Started at :- " + datetime;
    console.log(message);
});


