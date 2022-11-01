const axios = require('axios');

const adminMails = [
  'shimoniaviad@gmail.com',
  'tzvika.tubis@gmail.com',
  'adirbu98@gmail.com',
];

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

exports.user_home = async (req, res) => {
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
        isAdmin: isAdmin(req.oidc.user.email),
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

exports.add_coord = (req, res) => {
  res.render('add_coord');
};

exports.update_coord = async (req, res) => {
  axios
    .get(`http://localhost:3000/api/coords/${req.query.id}`)
    .then(function (coorddata) {
      res.render('update_coord', { coord: coorddata.data });
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

exports.admin_page = (req, res) => {
  if (isAdmin(req.oidc.user.email)) {
    res.render('admin-page');
  } else {
    res.render('home');
  }
};

exports.coord_manager = async (req, res) => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/coords');
    res.render('coord_manager', { coords: data });
  } catch (err) {
    console.log(err);
  }
};

const isAdmin = (email) => {
  return adminMails.includes(email);
};

// exports.admin_page = async (req, res) => {
//   try {
//     if () {
//       const { data } = await axios.get(
//         `http://localhost:3000/api/user/balance?userEmail=${req.oidc.user.email}`
//       );
//       const totalPortifolioWorth = await axios.get(
//         `http://localhost:3000/api/user/totalWorth?userEmail=${req.oidc.user.email}`
//       );

//       res.render('home-page', {
//         assets: data,
//         totalPortifolioWorth: totalPortifolioWorth.data,
//         user: req.oidc.user,
//       });
//     } else {
//       res.render('login');
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
