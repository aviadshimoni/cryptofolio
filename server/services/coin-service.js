const axios = require('axios');
const CoinMarketCap = require('coinmarketcap-api');

exports.getCurrentPrice = (req, res) => {
  console.log(req.query);
  if (req.query) {
    const coin_symbol = req.query.coin_symbol;
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
