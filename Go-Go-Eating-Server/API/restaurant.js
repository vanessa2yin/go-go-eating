const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const server = require('../server.js')


// -------------- GET REQUEST --------------

router.get('/', (request, response) => {
    const id = request.query["restaurant_id"]
    console.log('Fetching restaurant by id: '+id)
    const query = 'SELECT * FROM Restaurant WHERE restaurant_id = ?'
    connection = server.connection
    connection.query(query,[id],(err,rows,fieds)=>{
        if(err){
            console.log('Error when fetching restaurant by ID')
            response.sendStatus(400)
            return
        }
        console.log('Found restaurant with id: ' +id)
        response.json(rows[0])
    })
});



router.get('/search', (request, response) => {
    connection = server.connection
    const zipcode = request.query["zipcode"]
    var name = undefined
    name = request.query['name']
    if(name !== undefined){
        name = name.replace(/_/g, ' ');
    }

    var style = undefined
    style = request.query['style']

    if(style !== undefined){
        style = style.replace(/_/g, ' ');
    }

    //If name is undefined
    //Search for all restaurants and rank based on styles and price
    //filter by style if applicable
    if(name == undefined){
        //when we search based entirely on location, we give recommendations based on the user's previous reviews and visit history
        id = request.headers["userid"]
        if(id == undefined){
            //if the userid is not defined
            //we cannot give any specific recommendation
            //just return all restaurants in this area (with style filter if applicable)
            query = 'SELECT restaurant_id FROM Restaurant WHERE zip_code = '+zipcode
            if(style !== undefined){
                query = query + " AND restaurant_style LIKE \"%"+style+"%\""
            }

            connection.query(query,[],(err,rows,fieds)=>{
                if(err){
                    console.log('Error when fetching restaurant') 
                    response.sendStatus(400)
                    return
                }
                response.json(rows)
                return
            });
            return
        }
        //given a user, recommend restaurants based on their reviews and visit history
        style_pref = {}
        history = {}
        price_range = 0.0
        count = 0
        query = "SELECT restaurant_style,price_range,restaurant_id from RestaurantReview NATURAL JOIN Restaurant WHERE rating > 3 AND user_id = "+id +" UNION SELECT restaurant_style,price_range,restaurant_id from VisitedRestaurant NATURAL JOIN Restaurant WHERE user_id = "+id;
        connection.query(query,[],(err,rows,field)=>{
            if(err){
                console.log("Error when fetching user review history")
                response.sendStatus(400)
                return
            };

            for (let row of rows){
                var s = row["restaurant_style"]
                var arr = s.split(/\W+/)
                for (let each of arr){
                    if(each.length>0){    
                        each = each.toLowerCase();
                        if (each in style_pref){
                            style_pref[each]++;
                        } else {
                            style_pref[each] = 1;
                        }
                    }
                }
                history[row["restaurant_id"]] = true;
                price_range+=parseInt(row["price_range"])
                count++
            }
            for (var s in style_pref){
                //adjust the weights using BM25 transformation
                weight = style_pref[s]
                weight = 3*weight/(weight+2)
                style_pref[s] = weight
            }
            if(count!=0){
                price_range /= count
            }
             //now check all restaurants and assign different scores based on the user's preference
            //in this case, the user's previous visit/review to this restaurant is a negative factor

            query = "SELECT restaurant_style,restaurant_id,price_range FROM Restaurant WHERE zip_code = "+zipcode;
            if(style !== undefined){
                query += " AND LOWER(restaurant_style) LIKE \"%"+style+"%\""
            }
            connection.query(query,[],(err,restaurants,field)=>{
                if(err){
                    console.log("Error when fetching restaurants")
                    response.sendStatus(400)
                    return
                };
                score = {}
                for (let each of restaurants){
                    var styles = each["restaurant_style"].split(/\W+/)
                    var restaurant_score = 0
                    
                    for (let each_style of styles){
                        each_style = each_style.toLowerCase();
                        if(each_style in style_pref){
                            //if this restaurant's style is in the user's preference
                            restaurant_score += style_pref[each_style]
                        }
                    }
                    //adjust the price range factor; the closer price range, the higher score
                    var pr = each["price_range"]
                    var diff = Math.abs(pr-price_range)+1
                    var price_factor = 1/diff
                    restaurant_score *= price_factor
                    

                    //adjust the history factor; if the user has visited/reviewed the restaurant, the score is lowered
                    if(each["restaurant_id"] in history){
                        restaurant_score *= 0.9
                    }
                    score[each["restaurant_id"]]=restaurant_score
                }

                //now return restaurant_id and score
                //ranking is done in the front end
                var ret = []
                for (var k in score){
                    ret.push({
                        "restaurant_id":k,
                        "score":score[k]
                    })
                }
                response.json(ret);
                return
            })
        })     
    } else {
        //if name is defined
        //just search for this name and return the specific restaurant
        //ignore the userId
        query = 'SELECT restaurant_id FROM Restaurant WHERE zip_code = ' + zipcode;
        query = query + " AND restaurant_name = \"" + name + "\""
        if(style !== undefined){
            query = query + " AND restaurant_style LIKE \"%"+style+"%\""
        }
        connection.query(query,[],(err,rows,fieds)=>{
            if(err){
                console.log('Error when fetching restaurant with zipcode: ' +zipcode+" name: "+name+" style: "+style)
                response.sendStatus(400)
                return
            }
            response.json(rows)
            return
        });
    }
});

router.get('/review', (request, response) => {
    const user_id = request.query['user_id'];
    const restaurant_id = request.query['restaurant_id'];
    const query = 'select * from RestaurantReview where user_id = ' + user_id + ' and restaurant_id = ' + restaurant_id + ';';
    if (user_id === undefined || restaurant_id === undefined) {
        response.status(400).json({
            'error': 'Missing user id or restaurant id'
        });
        return;
    }
    server.connection.query(query, (error, rows, fields) => {
        if (rows.length === 0) {
            response.json({
                rating: 0
            });
        }
        else {
            response.json(rows[0]);
        }
    });
});

// -------------- POST REQUEST --------------
router.post('/review', function(request,response){
    var restaurant_id = request.body.restaurant_id
    var user_id = request.body.user_id
    var rating = request.body.rating
    var query = `INSERT INTO RestaurantReview (restaurant_id, user_id, rating) VALUES (${restaurant_id},${user_id},${rating})`
    select = `SELECT * FROM RestaurantReview WHERE restaurant_id = ${restaurant_id} AND user_id = ${user_id}`
    connection = server.connection
  
    connection.query(select,[],(err,rows,fields)=>{
        if(err){
            console.log("Error when fetching review record")
            response.status(500).json({"message":"Error when checking review record","err":err})
            return
        }
        if(rows[0] !== undefined){
            //record already exixts! use put to update the rating
            response.status(400).json({"error":"Review already exists"})
            return
        }
        connection.query(query,[],(err,rows,fieds)=>{
            if(err){
                console.log('Error when posting review' + err)
                response.status(500).json({"message":"Error when posting review", "err":err})
                return
            }

            response.statusCode = 201
            response.json({
                restaurant_id: restaurant_id,
                user_id: user_id,
                rating: rating
            }) 
            return
       
        })
    })
    return

})

// -------------- PUT REQUEST --------------
router.put('/review', function(request,response){
    review_id = request.query["review_id"]
    rating = request.body.rating
    
    select_query = `SELECT * FROM RestaurantReview WHERE review_id = ${review_id}`
    connection = server.connection
    connection.query(select_query,[],(err,rows,field)=>{
        if(err){
            console.log("Error when searching review: " + err)
            response.json({
                "error": "Error when searching review with SQL. Try again."
            }).status(400)
            return
        }
        if(rows[0] == undefined){
            //record does not exist
            //use POST
            response.json({
                "error": "No record found. Use POST to create the review"
            }).status(400)
            return
        } else {
            //found the record
            console.log('Found');
            console.log(rating);
            update_query = `UPDATE RestaurantReview SET rating = ${rating} WHERE review_id = ${review_id}`
            connection.query(update_query,[],(err,rows,field)=>{
                if(err){
                    console.log("Error when updating in SQL: "+err)
                    response.json({
                        "error":"Error when updating in SQL"
                    }).status(400)
                    return
                }
                response.sendStatus(204)
                return
            })
        }
    })
})

// -------------- DELETE REQUEST --------------

/* Delete a restaurant review*/
router.delete("/review",function(req,res){
    review_id = request.query["review_id"]

    if(review_id == undefined){
        res.status(400).json({"error":"Please specify review id"})
        return
    }

    let select_query = `SELECT * FROM RestaurantReview WHERE review_id = ${review_id}`
    let query = "DELETE FROM RestaurantReview WHERE review_id = " + review_id

    connection = server.connection

    connection.query(select_query,[],(err,rows,field)=>{
        if(err){
            console.log("Error when fetching review to delete")
            res.status(500).json({"message":"Error when fetching review to delete","err":err})
        }
        if(rows[0] == undefined){
            //record does not exist
            response.json({
                "error": "No record found. Unable to delete"
            }).status(404)
            return
        } else {
            connection.query(query,[],(err,rows,field)=>{
                if(err){
                    console.log("Error when trying to delete review" + err)
                    res.status(500).json({"message":"Error when trying to delete review","err":err})
                    return
                }
            })
        }

    })
    

})

module.exports = router;