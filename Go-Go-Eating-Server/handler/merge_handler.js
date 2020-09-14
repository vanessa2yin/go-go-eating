const queryHandler = require('../handler/query_handler');
const responseUtil = require('../utils/response');
const mealRequest = require('../Models/request_model');

// Send merge request
module.exports.sendInviteRequest = async function(request, response) {
    let user_id = request.body.userId;
    let request_id = request.body.requestId;
    let checkIfInviteRequestExistsQuery = "SELECT * FROM MealInvitation WHERE user_id = " + user_id + " AND request_id = " + `'${request_id}'`;
    try {
        const rows = await queryHandler.runQuery(checkIfInviteRequestExistsQuery);
        if (rows[0] !== undefined) {
            throw 'Invitations already exists. Do not post it again';
        }
        const sendInviteRequestQuery = `INSERT INTO MealInvitation (user_id, request_id) VALUES (${user_id}, '${request_id}')`;
        await queryHandler.runQuery(sendInviteRequestQuery);
        responseUtil.contentCreated(response, {
            userId: user_id,
            requestId: request_id
        });
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};

module.exports.sendMergeRequest = async function(request, response) {
    let inviter = request.body.inviterId;
    let invitee = request.body.inviteeId;
    let invitingRequestId = request.body.invitingRequestId;
    let invitedRequestId = request.body.invitedRequestId;
    const checkIfMergeRequestExistsQuery = "SELECT * FROM MergeInvitation WHERE inviting_request_id = " +  `'${invitingRequestId}'` + " AND invited_request_id = " + `'${invitedRequestId}'`;
    try {
        const rows = await queryHandler.runQuery(checkIfMergeRequestExistsQuery);
        if (rows[0] !== undefined) {
            throw 'Merge invitation already exists. Do not post it again';
        }
        const sendMergeRequestQuery = `INSERT INTO MergeInvitation (inviter_id,invitee_id,inviting_request_id,invited_request_id) VALUES (${inviter},${invitee}, '${invitingRequestId}', '${invitedRequestId}')`;
        await queryHandler.runQuery(sendMergeRequestQuery);
        responseUtil.contentCreated(response, {
            inviterId:inviter,
            inviteeId:invitee,
            invitingRequestId: invitingRequestId,
            invitedRequestId:invitedRequestId
        });
    } catch (error) {
        console.log(error);
        responseUtil.badRequest(response, error);
    }
};

module.exports.acceptInviteRequest = async function(request, response) {
    if (request.body.userId === undefined || request.body.requestId === undefined) {
        responseUtil.badRequest(response, 'Missing userId or requestId');
        return;
    }
    const user_id = request.body.userId;
    const request_id = request.body.requestId;
    let checkIfInviteRequestExistsQuery = "SELECT * FROM MealInvitation WHERE user_id = " + user_id + " AND request_id = " + `'${request_id}'`;
    try {
        const rows = await queryHandler.runQuery(checkIfInviteRequestExistsQuery);
        console.log(checkIfInviteRequestExistsQuery);
        console.log(rows);
        if (rows[0] === undefined) {
            throw 'Invite request does not exist';
        }
        const searchQuery = { _id: request_id };
        const operation = { $addToSet: { participants: user_id }};
        await mealRequest.update(searchQuery, operation);
        const removeInvitation = "DELETE FROM MealInvitation where user_id = " + user_id + " AND request_id = " + `'${request_id}'`;
        await queryHandler.runQuery(removeInvitation);
        responseUtil.noContent(response);
    } catch (error) {
        console.log(error);
        responseUtil.badRequest(response, error);
    }
};

module.exports.acceptMergeRequest = async function(request, response) {
    const inviterId = request.body.inviter;
    const inviteeId = request.body.invitee;
    const invitingRequestId = request.body.invitingRequestId;
    const invitedRequestId = request.body.invitedRequestId;
    const checkIfMergeRequestExistsQuery = "SELECT * FROM MergeInvitation WHERE inviting_request_id = " + `'${invitingRequestId}'` + " AND invited_request_id = " + `'${invitedRequestId}'`;
    console.log(checkIfMergeRequestExistsQuery);
    try {
        const rows = await queryHandler.runQuery(checkIfMergeRequestExistsQuery);
        if (rows[0] === undefined) {
            throw 'Invite request does not exist';
        }
        const invitedRequest = await mealRequest.findRequestById(invitedRequestId);
        invitedRequest[0].participants.push(inviteeId);
        const searchQuery = { _id: invitingRequestId };
        const operation = { $addToSet: { participants: invitedRequest.participants }};
        await mealRequest.update(searchQuery, operation);
        const removeMergeRequest = "DELETE FROM MergeInvitation where inviting_request_id = " + `'${invitingRequestId}'` + " AND invited_request_id = " + `'${invitedRequestId}'`;
        await queryHandler.runQuery(removeMergeRequest);
        responseUtil.noContent(response);
    } catch (error) {
        console.log(error);
        responseUtil.badRequest(response, error);
    }
};

module.exports.declineInviteRequest = async function(request, response) {
    const userId = request.body.userId;
    const requestId = request.body.requestId;
    if (userId === undefined || requestId === undefined) {
        responseUtil.badRequest(response, 'Missing Information');
        return;
    }
    const removeInvitation = "DELETE FROM MealInvitation where user_id = " + userId + " AND request_id = " + `'${requestId}'`;
    try {
        await queryHandler.runQuery(removeInvitation);
        responseUtil.noContent(response);
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};

module.exports.declineMergeRequest = async function(request, response) {
    const invitingRequestId = request.body.invitingRequestId;
    const invitedRequestId = request.body.invitedRequestId;
    if (invitingRequestId === undefined || invitedRequestId === undefined) {
        responseUtil.badRequest(response, 'Missing Information');
        return;
    }
    const removeMergeRequest = "DELETE FROM MergeInvitation where inviting_request_id = " + `'${invitingRequestId}'` + " AND invited_request_id = " + `'${invitedRequestId}'`;
    console.log(removeMergeRequest);
    try {
        await queryHandler.runQuery(removeMergeRequest);
        responseUtil.noContent(response);
    } catch (error) {
        responseUtil.badRequest(response, error);
    }
};
