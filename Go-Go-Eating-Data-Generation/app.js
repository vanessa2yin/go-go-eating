const fs = require('fs');
const request = require('request');
const url = require('./config');

const userList = JSON.parse(fs.readFileSync('./raw.json'));
const afterList = [];

for (const user of userList) {
    afterList.push({
        email: user.email,
        full_name: user.firstName + ' ' + user.lastName,
        user_name: user.username,
        password: user.password
    });
}

fs.writeFileSync('./user_data.json', JSON.stringify(afterList, null, ' '), 'utf-8');