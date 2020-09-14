const queryHandler = require('./query_handler');
const responseUtil = require('../utils/response');

module.exports.register = async function(request, response) {
    const username = request.body.username;
    const fullname = request.body.fullname;
    const email = request.body.email;
    const password = request.body.password;
    if (username === undefined || fullname === undefined || email === undefined || password === undefined) {
        responseUtil.badRequest(response, 'Missing Information');
        return;
    }
    const insertUserQuery = `INSERT INTO User (email, full_name, user_name, password) VALUES ("${email}", "${fullname}", "${username}", "${password}")`;
    try {
        const userId = await queryHandler.runQuery(insertUserQuery);
        responseUtil.contentCreated(response, userId);
    } catch (error) {
        console.log(error);
        responseUtil.badRequest(response, error);
    }
};

module.exports.login = async function(request, response) {
    const email = request.body.email;
    const password = request.body.password;
    if (email === undefined || password == undefined) {
        responseUtil.badRequest(response, 'Missing Information');
        return;
    }
    const searchQuery = `SELECT * from User where email = "${email}"`;
    try {
        const rows = await queryHandler.runQuery(searchQuery);
        if (rows[0] === undefined) {
            responseUtil.contentNotFound(response, 'User does not exist');
            return;
        }
        if (rows[0].password !== password) {
            responseUtil.unauthorized();
            return;
        }
        responseUtil.contentFound(response, rows[0]);
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};

module.exports.getInfo = async function(request, response) {
    if (request.query.userId === undefined) {
        responseUtil.badRequest(response, 'Missing user id');
        return;
    }
    const searchQuery = `SELECT * from User where user_id = ${request.query.userId}`;
    try {
        const rows = await queryHandler.runQuery(searchQuery);
        if (rows[0] === undefined) {
            responseUtil.contentNotFound(response, 'User does not exist');
            return;
        }
        responseUtil.contentFound(response, rows[0]);
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};