const mongoose = require('mongoose');

// Request Schema
const MealRequestSchema = mongoose.Schema({
    organizer: {
        type: Number,
        required: true
    },
    preference: {
        type: String
    },
    zipcode: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    capacity: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    participants: { 
        type: 'array',
        items: { type: Number, uniqueItems: true }
    }
});

// Export Request Model
const MealRequest = module.exports = mongoose.model('MealRequest', MealRequestSchema);

// Add participant to the activity
// module.exports.addParticipant = async function(activityId, userId) {
//     try {
//         await Activity.update({ _id: activityId }, {$addToSet: { participants: userId }});
//         Promise.resolve('Pariticipant added');
//     } catch (error) {
//         Promise.reject(error);
//     }
// };


module.exports.findRequestById = async function(requestId){
    return new Promise((resolve, reject) => {
        MealRequest.find({ _id: requestId }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};

module.exports.searchRequest = async function(searchQuery) {
    return new Promise((resolve, reject) => {
        MealRequest.find(searchQuery, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                const requestIdList = result.map((item) => {
                    return item._id;
                });
                resolve(requestIdList);
            }
        });
    });
};

module.exports.removeRequestById = async function(requestId) {
    return new Promise((resolve, reject) => {
        MealRequest.remove({ _id: requestId },(error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
};