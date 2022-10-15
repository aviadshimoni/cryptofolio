const express = require('express');
const route = express.Router();

const services = require('../services/render');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');

/**
 *  @description Root Route
 *  @method GET /
 */
// route.get('/', services.login);
route.get('/', services.homeRoutes);

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
route.post('/api/users', userController.create);
// route.post('/register', userController.register);
route.get('/api/users', userController.find);
route.put('/api/users/:id', userController.update);
route.delete('/api/users/:id', userController.delete);

// Article
route.post('/api/articles', articleController.create);
route.get('/api/articles', articleController.find);
route.put('/api/articles/:id', articleController.update);
route.delete('/api/articles/:id', articleController.delete);

module.exports = route;
