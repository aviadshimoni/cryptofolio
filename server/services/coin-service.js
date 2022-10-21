const axios = require('axios');
const CoinMarketCap = require('coinmarketcap-api');

exports.getCurrentPrice = (req, res) => {
    console.log(req.query);
    if (req.query) {
        const coin_symbol = req.query.coinSymbol;
        try {
            const client = new CoinMarketCap(process.env.CMC_API_KEY);
            client.getQuotes({ symbol: coin_symbol }).then((coin_quotes) => {
                console.log(coin_quotes.data[coin_symbol].quote.USD.price);
                res.send({ price: coin_quotes.data[coin_symbol].quote.USD.price });
            });
        } catch (error) {
            console.log(error);
        }
    }
};

exports.getTotalPortifolioWorth = (req, res) => {
  axios
      .get('http://localhost:3000/api/user/balance?userId=63517abf96c1d8a1a8466ee6') //ETH, BTC, XMR
      .then(function (response) {
        let sumCoinsObject = response.data;
        let totalPortifolioWorth = 0;
        for(let i = 0; i < sumCoinsObject.length; i++)
        {
          let coin = sumCoinsObject[i].coin[0].shortName;
          let amount = parseInt(sumCoinsObject[i].amount);
            axios
                .get('http://localhost:3000/api/coin-price?coinSymbol=' + coin)
                .then(function (response) {
                    totalPortifolioWorth += amount * parseInt(response.data.price); //TODO: this should update variable in line 25
                })
        }
        console.log(totalPortifolioWorth);
        res.send({ totalPortifolioWorth: totalPortifolioWorth })
      })
      .catch((err) => {
        res.send(err);
      });
};