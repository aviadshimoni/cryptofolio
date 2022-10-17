const CoinMarketCap = require('coinmarketcap-api');
const dotenv = require('dotenv');
dotenv.config({ path: '../../config.env' });

function print_price(data){
    return data["data"]["BTC"]["quote"]["price"]
}

function get_price(coin_symbol){
    const client = new CoinMarketCap(process.env.CMC_API_KEY);
    let price = client.getQuotes({symbol: 'BTC'}).then(print_price).catch(console.error);
    return price;
}

console.log(get_price("ETH"))