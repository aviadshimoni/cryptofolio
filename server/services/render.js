const axios = require('axios');

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  axios
    .get('http://localhost:3000/api/users')
    .then(function (response) {
      res.render('index', { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.login = async (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      const { data } = await axios.get(
        `http://localhost:3000/api/user/balance?userEmail=${req.oidc.user.email}`
      );
      const totalPortifolioWorth = await axios.get(
        `http://localhost:3000/api/user/totalWorth?userEmail=${req.oidc.user.email}`
      );

      res.render('home-page', {
        assets: data,
        totalPortifolioWorth: totalPortifolioWorth.data,
        user: req.oidc.user,
      });
    } else {
      res.render('login');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.maps = (req, res) => {
  res.render('maps', { maps_key: process.env.MAPS_TOKEN });
};

exports.add_user = (req, res) => {
  res.render('add_user');
};

exports.update_user = (req, res) => {
  axios
    .get('http://localhost:3000/api/users', { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render('update_user', { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// OMER
exports.user_transactions = (req, res) => {
  // Make a get request to /api/users
  //let tempUser = 'shimoniaviad@gmail.com';
  axios
    .get(`http://localhost:3000/api/transactions?userEmail=${req.oidc.user.email}`)
    .then(function (response) {
      res.render('transactions', { 
        transactions: response.data ,
        user: req.oidc.user,});
    })
    .catch((err) => {
      res.send(err);
    });
};

// MORAN
exports.home = (req, res) => {
  res.render('home');
};
