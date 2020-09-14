const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const server = require('../server.js')
const MealRequest = require('../Models/request_model.js');
const mergeHandler = require('../handler/merge_handler');
const mealRequestHandler = require('../handler/meal_request_handler');

// -------------- GET REQUEST --------------

router.get("/invitationRequestSent", (request, response) => {
    mealRequestHandler.getInvitationRequestSent(request, response); 
});

router.get("/invitationRequestReceived", (request, response) => {
    mealRequestHandler.getInvitationRequestReceived(request, response); 
});

router.get("/mergeRequestSent", (request, response) => {
    mealRequestHandler.getMergeRequestSent(request, response);
});
router.get("/mergeReceived", (request, response) => {
    mealRequestHandler.getMergeRequestReceived(request, response);
});

router.get('/', (request, response) => {
    mealRequestHandler.getMealRequestById(request, response);
});

router.get('/search', (request, response) => {
    mealRequestHandler.searchMealRequest(request, response);
});

// -------------- POST REQUEST --------------
router.post('/', (request, response) => {
    mealRequestHandler.createMealRequest(request, response);
});

router.post('/sendInviteRequest', (request,response) => {
    mergeHandler.sendInviteRequest(request, response);
});

router.post('/sendMergeRequest', (request,response) => {
    mergeHandler.sendMergeRequest(request, response);
});

// -------------- PATCH REQUEST --------------
router.patch('/join', (request, response) => {
    mealRequestHandler.joinMealRequest(request, response);
});

router.patch('/quit', (request, response) => {
    mealRequestHandler.quitMealRequest(request, response);
});

router.patch('/acceptInviteRequest', (request, response) => {
    mergeHandler.acceptInviteRequest(request, response);
});

router.patch('/acceptMergeRequest', (request, response) => {
    mergeHandler.acceptMergeRequest(request, response);
});

router.patch('/declineInviteRequest', (request, response) => {
    mergeHandler.declineInviteRequest(request, response);
});

router.patch('/declineMergeRequest', (request, response) => {
    mergeHandler.declineMergeRequest(request, response);
});

// -------------- DELETE REQUEST --------------

router.delete('/', async(request, response) => {
    // Has Middleware, get request by id
    mealRequestHandler.dismissMealRequest(request, response);
});

module.exports = router
