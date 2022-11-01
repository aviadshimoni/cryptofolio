const express = require('express');
const route = express.Router();

const services = require('../services/render');
const transactionController = require('../controllers/transactionController');
const coinController = require('../controllers/coinController');
const coordController = require('../controllers/coordController');
const coinData = require('../services/coin_service');
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: 'S1ucNmVM1lAUtFwQ6zm3IWh4mQ104PEv',
  issuerBaseURL: 'https://dev-6otkihvjdof2ziuu.us.auth0.com',
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
route.use(auth(config));

route.get('/', services.user_home);
route.get('/maps', services.maps);
route.get('/admin', services.admin_page);

// OMER is working here
route.get('/transactions', services.user_transactions);

// MORAN is working here
// route.get('/home', services.homeRoutes);

route.get('/admin/coin-manager', services.coin_manager);
route.get('/admin/coin-manager/add-coin', services.add_coin);
route.get('/admin/coin-manager/update-coin', services.update_coin);

route.get('/api/coin-price', coinData.getCurrentPrice);

route.get('/api/user/balance', transactionController.balance);
route.get('/api/user/totalWorth', coinData.getTotalPortifolioWorth);

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

//Coords
route.post('/api/coords', coordController.create);
route.get('/api/coords/:id', coordController.getId);
route.get('/api/coords', coordController.get);
route.put('/api/coords/:id', coordController.update);
route.delete('/api/coords/:id', coordController.delete);

module.exports = route;
