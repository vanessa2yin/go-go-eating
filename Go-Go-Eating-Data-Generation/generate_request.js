const fs = require('fs');
const request = require('request');
const url = require('./config').serverAddress;
const random = require('./get_random');

const requestList = JSON.parse(fs.readFileSync('./request_raw.json'));
let count = 0;

async function run() {
    for (let i = 0; i < 5; i++) {
        const options = {
            method: 'POST',
            url: url + '/meal_request', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                organizer: 1014,
                zipcode: random.getRandomZipCode(),
                preference: random.getRandomStyle(),
                time: random.getRandomTime(),
                capacity: requestList[i].capacity
            })
        };

        request(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(body);
            }
        });
    }
}


run();