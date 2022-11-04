const axios = require('axios');

const adminMails = [
  'shimoniaviad@gmail.com',
  'tzvika.tubis@gmail.com',
  'adirbu98@gmail.com',
];

const isAdmin = (email) => {
  return adminMails.includes(email);
};

exports.user_home = async (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      const { data } = await axios.get(
        `http://localhost:3000/api/user/balance?userEmail=${req.oidc.user.email}`
      );
      const totalPortifolioWorth = await axios.get(
        `http://localhost:3000/api/user/totalWorth?userEmail=${req.oidc.user.email}`
      );
      res.render('user_home', {
        assets: data,
        totalPortifolioWorth: totalPortifolioWorth.data,
        user: req.oidc.user,
        isAdmin: isAdmin(req.oidc.user.email),
      });
    } else {
      res.render('index');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.maps = (req, res) => {
  res.render('maps', { maps_key: process.env.MAPS_TOKEN });
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

exports.index = (req, res) => {
  res.render('index');
};


exports.admin_page = (req, res) => {
  if (isAdmin(req.oidc.user.email)) {
    res.render('admin_page');
  } else {
    res.render('home');
  }
};

