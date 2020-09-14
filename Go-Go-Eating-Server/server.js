const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')
const mongoose = require('mongoose');
const config = require('./Config/database');

mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});


// Initialize API
const app = express();

// Port number
const port = 3001;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const restaurants = require('./API/restaurant');
const meal_requests = require('./API/meal_request');
const user = require('./API/user');

app.use('/restaurant', restaurants); // Route
app.use('/meal_request',meal_requests);
app.use('/user', user);

let server = app.listen(port, () => {
    console.log('Server started on port ' + port);
});

const connection = mysql.createConnection({
    host:'localhost',
    user: 'hc10',
    database: 'GoEating',
    password : '12345678'
});

module.exports.connection = connection;
module.exports.mongoconnection = mongoose.connection;

module.exports = app; 

