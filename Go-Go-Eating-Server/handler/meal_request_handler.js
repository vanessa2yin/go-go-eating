const queryHandler = require('../handler/query_handler');
const responseUtil = require('../utils/response');
const mealRequest = require('../Models/request_model');

// --------------------------------GET--------------------------------

module.exports.getInvitationRequestSent = async function (request, response) {
    let request_id = request.query.requestId;
    let searchQuery = "SELECT request_id, user_id FROM MealInvitation WHERE request_id = " + request_id;
    try {
        const rows = await queryHandler.runQuery(searchQuery);
        responseUtil.contentFound(response, rows);
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};

module.exports.getInvitationRequestReceived = async function(request, response) {
    let user_id = request.query.userId;
    let searchQuery = "SELECT request_id, user_id FROM MealInvitation WHERE user_id = " + user_id;
    try {
        const rows = await queryHandler.runQuery(searchQuery);
        responseUtil.contentFound(response, rows);
    } catch (error) {
        console.log(error);
        responseUtil.badRequest(response, error);
    }
};

module.exports.getMergeRequestSent = async function(request, response) {
    let request_id = request.query.requestId;
    let searchQuery = "SELECT * FROM MergeInvitation WHERE inviter_id = " + request_id;
    try {
        const rows = await queryHandler.runQuery(searchQuery);
        responseUtil.contentFound(rows);
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};

module.exports.getMergeRequestReceived = async function(request, response) {
    let userId = request.query.userId;
    let searchQuery = "SELECT * FROM MergeInvitation WHERE invitee_id = " + userId;
    try {
        const rows = await queryHandler.runQuery(searchQuery);
        responseUtil.contentFound(response, rows);
    } catch (error) {
        console.log(error);
        responseUtil.badRequest(response, error);
    }
};

module.exports.getMealRequestById = async function(request, response) {
    try {
        const request_id = request.query.requestId;
        const result = await mealRequest.findRequestById(request_id);
        if (result === null) {
            responseUtil.contentNotFound(response, 'Not Found');
        }
        else {
            responseUtil.contentFound(response, result[0]);
        }
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};

module.exports.searchMealRequest = async function(request, response) {
    let zipcode = request.query.zipcode;
    let preference = request.query.preference;
    let organizer = request.query.organizer;
    if (zipcode == undefined){
        responseUtil.badRequest(response, 'Invalid input. Please specify zipcode');
        return;
    }
    let searchQuery = getQuery(zipcode, preference, organizer);
    try {
        const result = await mealRequest.searchRequest(searchQuery);
        responseUtil.contentFound(response, result);
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};

function getQuery(zipcode, preference, organizer) {
    if (preference === undefined && organizer === undefined) {
        return {
            $and: [
                {zipcode: zipcode},
                {time: { $gt: new Date() }}
            ]
        };
    }
    if (preference === undefined) {
        return {
            $and: [
                {zipcode: zipcode},
                {organizer: organizer},
                {time: { $gt: new Date() }}
            ]
        }
    }
    if (organizer === undefined) {
        return {
            $and: [
                {zipcode: zipcode},
                {preference: preference},
                {time: { $gt: new Date() }}
            ]
        };
    }
    return {
        $and: [
            {zipcode: zipcode},
            {preference: preference},
            {organizer: organizer},
            {time: { $gt: new Date() }}
        ]
    };
    
}

// --------------------------------POST--------------------------------

module.exports.createMealRequest = async function(request, response) {
    const meal_request = new mealRequest({
        organizer: request.body.organizer,
        zipcode: request.body.zipcode,
        address: request.body.address,
        preference: request.body.preference,
        time: request.body.time,
        capacity: request.body.capacity,
    });
    try{
        const newRequest = await meal_request.save();
        responseUtil.contentCreated(response, newRequest);
    } catch (error){
        responseUtil.badRequest(response, error);
    }
};

// --------------------------------PATCH--------------------------------
module.exports.joinMealRequest = async function(request, response) {
    const requestId = request.body.requestId;
    const participantId = request.body.participantId;
    const searchQuery = { _id: requestId };
    const operation = { $addToSet: { participants: participantId }};
    try {
        await mealRequest.update(searchQuery, operation);
        const request = await mealRequest.findRequestById(requestId);
        responseUtil.contentFound(response, request[0]);
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};

module.exports.quitMealRequest = async function(request, response) {
    const requestId = request.body.requestId;
    const participantId = request.body.participantId;
    const searchQuery = { _id: requestId };
    const operation = { $pull: {participants: participantId }};
    try {
        await mealRequest.update(searchQuery, operation);
        const request = await mealRequest.findRequestById(requestId);
        responseUtil.contentFound(response, request[0]);
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};

module.exports.dismissMealRequest = async function(request, response) {
    if (request.query.requestId === undefined) {
        responseUtil.badRequest(response, 'Missing meal request id');
        return;
    }
    try {
        await mealRequest.removeRequestById(request.query.requestId);
        responseUtil.noContent(response);
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};