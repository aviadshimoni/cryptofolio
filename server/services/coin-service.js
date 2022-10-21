const axios = require('axios');
const CoinMarketCap = require('coinmarketcap-api');

exports.getCurrentPrice = (req, res) => {
  console.log(req.query);
  if (req.query) {
    const coin_symbol = req.query.coinSymbol;
    try {
      const client = new CoinMarketCap(process.env.CMC_API_KEY);
      client.getQuotes({ symbol: coinSymbol }).then((coin_quotes) => {
        console.log(coin_quotes.data[coinSymbol].quote.USD.price);
        res.send({ price: coin_quotes.data[coinSymbol].quote.USD.price });
      });
    } catch (error) {
      console.log(error);
    }
  }
};

exports.getTotalPortifolioWorth = (req, res) => {
  axios
      .get('http://localhost:3000/getUserBalan', { params: { userId: "63517abf96c1d8a1a8466ee6" } }) //ETH, BTC, XMR
      .then(function (response) {
        let sumCoinsObject = JSON.parse(response);
        let totalPortifolioWorth = 0;
        for(let i = 0; i < sumCoinsObject.line.length; i++)
        {
          let coin = sumCoinsObject.line[i].coin[0].shortName;
          let amount = sumCoinsObject.line[i].amount;
          const res = await axios.get('http://localhost:3000/api/sum', { params: { coinSymbol: coin  });
          let currentPrice = res.data.price;
          totalPortifolioWorth += currentPrice * amount;
        }
        res.send({ totalPortifolioWorth: totalPortifolioWorth })
      })
      .catch((err) => {
        res.send(err);
      });
};