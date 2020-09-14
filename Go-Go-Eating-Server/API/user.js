const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const server = require('../server.js');
const userHandler = require('../handler/user_handler');

// ----------------------------GET----------------------------
router.get('/', (request, response) => {
    userHandler.getInfo(request, response);
});

// ----------------------------POST----------------------------
router.post('/register', (request, response) => {
    userHandler.register(request, response);
});

router.post('/login', (request, response) => {
    userHandler.login(request, response);
});

module.exports = router;