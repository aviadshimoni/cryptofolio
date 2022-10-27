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

exports.login = (req, res) => {
  if (req.oidc.isAuthenticated()) {
    axios
      .get('http://localhost:3000/api/users')
      .then(function (response) {
        res.render('index', { users: response.data });
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.render('login');
  }
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
  let tempUser = "63517abf96c1d8a1a8466ee6";
  axios
      .get(`http://localhost:3000/api/transactions?userId=${tempUser}`)
      .then(function (response) {
        res.render('transactions', { transactions: response.data });
      })
      .catch((err) => {
        res.send(err);
      });
};

// MORAN
exports.home = (req, res) => {
    res.render('home');
};
