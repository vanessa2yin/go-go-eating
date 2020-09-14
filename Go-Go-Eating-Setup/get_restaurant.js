const request = require('request');
const Config = require('./config');
const fs = require('fs');

async function getRestaurant(address, offset) {
    const qs = {
        term: 'food',
        location: address,
        radius: 40000,
        offset: offset,
        limit: 50
    };
    const headers = {
        Authorization: Config.authorization
    };
    const options = {
        url: Config.businessSearch,
        headers: headers,
        method: 'GET',
        qs: qs,
    };
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}

async function getRestaurants() {
    let restaurants = [];
    for (let i = 0; i < 20; i++) {
        try {
            let curr = await getRestaurant(Config.rootAddress, i * 20);
            if (curr !== undefined && curr['businesses'] !== undefined) {
                for (const each of curr['businesses']) {
                    let style = [];
                    for (const obj of each['categories']) {
                        style.push(obj['title'] + ' ');
                    }
                    const curr = {
                        restaurant_name: each['name'],
                        address: each['location']['address1'],
                        zip_code: each['location']['zip_code'],
                        restaurant_style: style.join(''),
                        rating_count: 0,
                        avg_rating: 0,
                        price_range: each['price'] === undefined ? 0 : each['price'].length,
                        image: each['image_url'] === undefined ? null : each['image_url']
                    }
                    restaurants.push(curr);
                }
            }
            else {
                break;
            }
        } catch (error) {
            console.log(error);
        }
    }
    fs.writeFileSync('restaurants_NY.json', JSON.stringify(restaurants, null, ' '), 'utf-8');
}

getRestaurants();