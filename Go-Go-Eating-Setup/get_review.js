const request = require('request');
const Config = require('./config');
const fs = require('fs');
const restaurants = JSON.parse(fs.readFileSync('./restaurants.json'));

async function getReview(restaurant_id) {
    const headers = {
        Authorization: Config.authorization
    };
    const options = {
        url: Config.reviewSearch.replace("{id}", restaurant_id),
        headers: headers,
        method: 'GET'
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

async function getReviewsForEachRestaurant() {
    let reviewList = [];
    let count = 0;
    for (const each of restaurants) {
        console.log(count++);
        const reviews = await getReview(each['id']);
        for (const eachReview of reviews['reviews']) {
            reviewList.push(eachReview);
        }
    }
    fs.writeFileSync('reviews.json', JSON.stringify(reviewList, null, ' '), 'utf-8');
}

getReviewsForEachRestaurant();