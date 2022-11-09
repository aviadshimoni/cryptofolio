const axios = require("axios");

const adminMails = [
    'shimoniaviad@gmail.com',
    'tzvika.tubis@gmail.com',
    'adirbu98@gmail.com',
    'omer5574@gmail.com',
  ];

const isAdmin = (email) => {
    return adminMails.includes(email);
  };

exports.coord_manager = async (req, res) => {
    try {
      if (req.oidc.isAuthenticated()) {
        var {data} = await axios.get('http://localhost:3000/api/coords')
        res.render('coord_manager', {
          coords: data,
          isAdmin: isAdmin(req.oidc.user.email),
          isAuth: req.oidc.isAuthenticated(),
        });
      }
      else {
        res.render('index');
      }
    } catch (e) {
      console.log(e);
    }
};

exports.add_coord = (req, res) => {
    try {
      if (req.oidc.isAuthenticated()) {
        res.render('add_coord', {
          isAdmin: isAdmin(req.oidc.user.email),
          isAuth: req.oidc.isAuthenticated(),
        });
      }
      else {
        res.render('index');
      }
    } catch (e) {
      console.log(e);
    }
  };

exports.update_coord = async (req, res) => {
    axios
        .get(`http://localhost:3000/api/coords/${req.query.id}`)
        .then(function (coorddata) {
            res.render('update_coord', {
               coord: coorddata.data,
               isAuth: req.oidc.isAuthenticated(),
            });
            
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.coin_manager = async (req, res) => {
    try {
      if (req.oidc.isAuthenticated()) {
        var {data} = await axios.get('http://localhost:3000/api/coins')
        res.render('coin_manager', {
          coins: data,
          isAdmin: isAdmin(req.oidc.user.email),
          isAuth: req.oidc.isAuthenticated(),
        });
      }
      else {
        res.render('index');
      }
    } catch (e) {
      console.log(e);
    }
};

exports.add_coord = async (req, res) => {
    try {
      if (req.oidc.isAuthenticated()) {
        var {data} = await axios.get('http://localhost:3000/api/coins')
        res.render('add_coord', {
          coins: response.data,
          isAdmin: isAdmin(req.oidc.user.email),
          isAuth: req.oidc.isAuthenticated(),
        });
      }
      else {
        res.render('index');
      }
    } catch (e) {
      console.log(e);
    }
  };

exports.add_coin = async (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      var {data} = await axios.get('http://localhost:3000/api/coins')
      res.render('add_coin', {
        coins: data,
        isAdmin: isAdmin(req.oidc.user.email),
        isAuth: req.oidc.isAuthenticated(),
      });
    }
    else {
      res.render('index');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.update_coin = (req, res) => {
    axios
        .get(`http://localhost:3000/api/coins/${req.query.id}`)
        .then(function (coindata) {
            res.render('update_coin', { 
              coin: coindata.data,
              isAuth: req.oidc.isAuthenticated(),
            });
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.delete_coin = async (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      await axios.delete(`http://localhost:3000/api/coins/${req.query.id}`)
      var {data} = await axios.get('http://localhost:3000/api/coins')
      res.render('coin_manager', {
        coins: data,
        isAdmin: isAdmin(req.oidc.user.email),
        isAuth: req.oidc.isAuthenticated(),
      });
    }
    else {
      res.render('index');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.delete_coord = async (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      await axios.delete(`http://localhost:3000/api/coords/${req.query.id}`)
      var {data} = await axios.get('http://localhost:3000/api/coords')
      res.render('coord_manager', {
        coords: data,
        isAdmin: isAdmin(req.oidc.user.email),
        isAuth: req.oidc.isAuthenticated(),
      });
    }
    else {
      res.render('index');
    }
  } catch (e) {
    console.log(e);
  }
};