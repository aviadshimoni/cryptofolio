const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const articleController = require('../controller/articleController');
const coinData = require('../services/coin-service');

/**
 *  @description Root Route
 *  @method GET /
 */
// route.get('/', services.login);
route.get('/', services.homeRoutes);
route.get('/coin', coinData.getCurrentPrice);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user);

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user);

// API

// User
route.post('/api/users', controller.create);
route.post('/register', controller.register);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

// Article
route.post('/api/articles', articleController.create);
route.get('/api/articles', articleController.find);
route.put('/api/articles/:id', articleController.update);
route.delete('/api/articles/:id', articleController.delete);

module.exports = route;
