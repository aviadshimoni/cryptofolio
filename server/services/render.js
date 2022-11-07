const axios = require('axios');

const adminMails = [
  'shimoniaviad@gmail.com',
  'tzvika.tubis@gmail.com',
  'adirbu98@gmail.com',
  'omer5574@gmail.com',
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
exports.user_transactions = async (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      const { data } = await axios.get(
        `http://localhost:3000/api/transactions?userEmail=${req.oidc.user.email}`
      );
      const { assets } = await axios.get(
        `http://localhost:3000/api/user/balance?userEmail=${req.oidc.user.email}`
      );
      res.render('transactions', {
        transactions: data,
        assets: assets,
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


exports.admin_page = async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    const { data } = await axios.get(
      `http://localhost:3000/api/user/balance?userEmail=${req.oidc.user.email}`
    );
    if (isAdmin(req.oidc.user.email)) {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/transactions/usersStats`
        );
        res.render('admin_page', {
          isAdmin: isAdmin(req.oidc.user.email),
          stats: JSON.stringify(data),
        });
      }
      catch (e) {
        console.log(e);
      }
    } else {
      res.render('index');
    }
  }
  else {
    res.render('index');
  }
};

