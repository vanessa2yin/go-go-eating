const fs = require('fs');
const restaurants = JSON.parse(fs.readFileSync('./restaurants.json'));
const result = [];

for (const each of restaurants) {
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
    result.push(curr);
}

fs.writeFileSync('./restaurant_after.json', JSON.stringify(result, null, ' '), 'utf-8');