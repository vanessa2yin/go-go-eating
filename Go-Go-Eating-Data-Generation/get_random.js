const styles = ['Fast Food', 'Sandwiches', 'Pizza', 'Chicken Wings', 'Barbecue', 'Italian','Chinese', 'Mexican', 'Japanese', 'Korean', 'Bar', 'American'];
const zipcode = JSON.parse(require('fs').readFileSync('../Go Eating/data/raw/restaurant_champaign.json')).map((item) => { return item.zip_code; });

module.exports.getRandomStyle = function() {
    return styles[Math.floor(Math.random() * styles.length)];
}

module.exports.getRandomZipCode = function() {
    return zipcode[Math.floor(Math.random() * zipcode.length)];
}

module.exports.getRandomTime = function() {
    return new Date((new Date().getTime() + Math.floor(Math.random()*10000000000)));
}