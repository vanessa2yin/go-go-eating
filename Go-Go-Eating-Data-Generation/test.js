const request = require('request');

request('http://144.202.50.81:3001/restaurant/search?zipcode=61820', { headers: { userId: 1 }});