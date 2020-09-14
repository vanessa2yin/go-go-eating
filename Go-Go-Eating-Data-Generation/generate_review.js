const request = require('request');
const url = require('./config').serverAddress;

let count = 0;

async function run() {
    for (let i = 0; i < 10000; i++) {
        const restaurant_id = Math.floor(Math.random() * 5000);
        const user_id = Math.floor(Math.random() * 1000) + 1;
        const headers = {
            'Content-Type': 'application/json'
        };
        const body = {
            restaurant_id: restaurant_id,
            user_id: user_id,
            rating: Math.floor(Math.random() * 5) + 1
        };
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
            url: url + '/restaurant/review'
        };
        try {
            await new Promise((resolve, reject) => {
                request(options, (error, response, body) => {
                    if (!error) {
                        resolve(body);
                    }
                    else {
                        reject(error);
                    }       
                });
            });
            console.log(++count);
        } catch (error) {
            console.log(error);
        }
        
    }
}

run();