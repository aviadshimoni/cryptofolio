const express = require('express');
const route = express.Router();

const services = require('../services/render');
const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController');
const coinController = require('../controllers/coinController');
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
route.get('/api/users/:id', userController.getId);
route.get('/api/users', userController.get);
route.put('/api/users/:id', userController.update);
route.delete('/api/users/:id', userController.delete);

//Transactions
route.post('/api/transactions', transactionController.create);
route.get('/api/transactions/:id', transactionController.getId);
route.get('/api/transactions', transactionController.get);
route.put('/api/transactions/:id', transactionController.update);
route.delete('/api/transactions/:id', transactionController.delete);

//Coins
route.post('/api/coins', coinController.create);
route.get('/api/coins/:id', coinController.getId);
route.get('/api/coins', coinController.get);
route.put('/api/coins/:id', coinController.update);
route.delete('/api/coins/:id', coinController.delete);

// Article
route.post('/api/articles', articleController.create);
route.get('/api/articles', articleController.find);
route.put('/api/articles/:id', articleController.update);
route.delete('/api/articles/:id', articleController.delete);

module.exports = route;
