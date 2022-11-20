const axios = require('axios');

const adminMails = [
  'shimoniaviad@gmail.com',
  'tzvika.tubis@gmail.com',
  'omer5574@gmail.com',
  'moran.esh@gmail.com',
  'aviad.shimoni@doubleverify.com'
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
        isAuth: req.oidc.isAuthenticated(),
      });
    } else {
      res.render('index');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.maps = (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      res.render('maps', {
        maps_key: process.env.MAPS_TOKEN,
        isAdmin: isAdmin(req.oidc.user.email),
        isAuth: req.oidc.isAuthenticated(),
      });
    }
    else {
      res.render('maps', {
        maps_key: process.env.MAPS_TOKEN,
        isAuth: req.oidc.isAuthenticated(),
      });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.about = (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      res.render('about', {
        isAdmin: isAdmin(req.oidc.user.email),
        isAuth: req.oidc.isAuthenticated(),
      });
    }
    else {
      res.render('about', {
        isAuth: req.oidc.isAuthenticated(),
      });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.user_transactions = async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/transactions?userEmail=${req.oidc.user.email}`
      );
      const { assets } = await axios.get(
        `http://localhost:3000/api/user/balance?userEmail=${req.oidc.user.email}`
      );
      const coins = await axios.get(
        `http://localhost:3000/api/coins`
      );
      const totalPortifolioWorth = await axios.get(
        `http://localhost:3000/api/user/totalWorth?userEmail=${req.oidc.user.email}`
      );
      console.log(coins.data);
      res.render('transactions', {
        transactions: data,
        coins: coins.data,
        assets: assets,
        user: req.oidc.user,
        totalPortifolioWorth: totalPortifolioWorth.data,
        isAdmin: isAdmin(req.oidc.user.email),
        isAuth: req.oidc.isAuthenticated(),
      });
    } catch (e) {
      console.log(e);
    }
  } else {k
    res.render('index');
  }
};

exports.admin_page = async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    if (isAdmin(req.oidc.user.email)) {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/transactions/usersStats`
        );
        const coins = await axios.get(
            `http://localhost:3000/api/coins`
        );
        query = req.query;
        let transactions=[];
        let select = "All Coins"
        if(query.coinId && query.coinId!=="all")
        {
          transactions = await axios.get(
            `http://localhost:3000/api/transactions-by-coin/${query.coinId}`
          );
          let coin = await axios.get(
              `http://localhost:3000/api/coins/${query.coinId}`
          );
           select = coin.data.name
        }
        else{
          transactions = await axios.get(
            `http://localhost:3000/api/transactions`
          );
        }

        console.log(transactions)
        res.render('admin_page', {
          isAdmin: isAdmin(req.oidc.user.email),
          stats: JSON.stringify(data),
          isAuth: req.oidc.isAuthenticated(),
          coins: coins.data,
          currentSelect: select,
          transactions: transactions.data,
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

