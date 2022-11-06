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
      var balance = {}
      var keys= []
      for(var i=0; i<data.length;i++) {
        balance[data[i].coin[0].shortName]=data[i].amount;
        keys.push(data[i].coin[0].shortName)
      }
      res.render('user_home', {
        assets: data,
        totalPortifolioWorth: totalPortifolioWorth.data,
        user: req.oidc.user,
        isAdmin: isAdmin(req.oidc.user.email),
        balance: JSON.stringify(balance),
        keys: JSON.stringify(keys),
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

exports.user_stats = (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      axios
      .get(`http://localhost:3000/api/user/balance?userEmail=${req.oidc.user.email}`)
      .then(function (response) {
        var balance = response.data;
        var data = {}
        var keys= []
        for(var i=0; i<balance.length;i++) {
          data[balance[i].coin[0].shortName]=balance[i].amount;
          keys.push(balance[i].coin[0].shortName)
        }
        res.render('stats', { balance: JSON.stringify(data), keys: JSON.stringify(keys) });
      })
      .catch((err) => {
        res.send(err);
      });
    } else {
      res.render('index');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.index = (req, res) => {
  res.render('index');
};


exports.admin_page = (req, res) => {
  if (isAdmin(req.oidc.user.email)) {
    res.render('admin_page');
  } else {
    res.render('index');
  }
};

