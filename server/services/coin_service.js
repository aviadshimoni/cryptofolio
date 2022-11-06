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

exports.getTotalPortifolioWorth = async (req, res) => {
  try {
    const userEmail =
      req.oidc.user?.email == null ? req.query.userEmail : req.oidc.user?.email;
    const { data } = await axios.get(
      `http://localhost:3000/api/user/balance?userEmail=${userEmail}`
    );
    const results = await Promise.all(
      data.map(async (item) => {
        const currentPrice = await axios.get(
          `http://localhost:3000/api/coin-price?coinSymbol=${item.coin[0].shortName}`
        );
        return Math.round(currentPrice.data.price * item.amount * 100) / 100
      })
    );
    const totalPortifolioWorth = results.reduce((b, a) => b + a, 0);
    res.send({ totalPortifolioWorth });
  } catch (err) {
    console.error(err);
    res.send(err);
  }
};
