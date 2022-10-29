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
      // const totalPortifolioWorth = await axios.get(
      //   `http://localhost:3000/api/user/totalWorth`
      // );
      // console.log('totalPortifolioWorth :>> ', totalPortifolioWorth.data);
      res.render('home-page', {
        assets: data,
        // totalPortifolioWorth,
        user: req.oidc.user,
      });
    } else {
      res.render('login');
    }
  } catch (e) {
    console.log(e);
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
  let tempUser = 'shimoniaviad@gmail.com';
  axios
    .get(`http://localhost:3000/api/transactions?userEmail=${tempUser}`)
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
