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

exports.maps = (req, res) => {
  // Make a get request to /api/users
  axios
    .get('http://localhost:3000/api/coords')
    .then(function (response) {
      res.render('maps', { maps_key: process.env.MAPS_TOKEN });
    })
    .catch((err) => {
      res.send(err);
    });
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
