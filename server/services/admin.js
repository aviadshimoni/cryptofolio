const axios = require("axios");

// Coordinates Manager
exports.coord_manager = async (req, res) => {
    try {
        const { data } = await axios.get('http://localhost:3000/api/coords');
        res.render('coord_manager', { coords: data });
    } catch (err) {
        console.log(err);
    }
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

// Coin Manager
exports.coin_manager = (req, res) => {
    // Make a get request to /api/users
    axios
        .get('http://localhost:3000/api/coins')
        .then(function (response) {
            res.render('coin_manager', { coins: response.data });
        })
        .catch((err) => {
            res.send(err);
        });
};


exports.add_coin = (req, res) => {
    res.render('add_coin');
};

exports.update_coin = (req, res) => {
    axios
        .get(`http://localhost:3000/api/coins/${req.query.id}`)
        .then(function (coindata) {
            res.render('update_coin', { coin: coindata.data });
        })
        .catch((err) => {
            res.send(err);
        });
};