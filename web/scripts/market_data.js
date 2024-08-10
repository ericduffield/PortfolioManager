import { Product } from './classes.js';
import { AssetClass } from './enums.js';

const AssetClasses = {
    [AssetClass.Stock]: ["AAPL", "MSFT", "NVDA", "GOOG", "AMZN", "META", "TSLA", "MS"],
    [AssetClass.Bond]: ["US1Y", "US5Y", "US10Y", "US30Y"],
    [AssetClass.Crypto]: ["BTC", "ETH", "USDT", "BNB", "SOL", "USDC"],
    [AssetClass.ETF]: ["SPY", "VOO", "VTI", "QQQ"]
}

let productInfo = {};

const getCrypto = async () => {

    let urls = [];
    AssetClasses[AssetClass.Crypto].forEach(function (crypto) {
        urls[crypto] = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + crypto + '&tsyms=USD';
    });

    await Promise.all(AssetClasses[AssetClass.Crypto].map(ticker => fetch(urls[ticker])
        .then(response => response.json()
        .then(data => {
            productInfo[ticker] = new Product(
                ticker, AssetClass.Crypto, 
                data.RAW[ticker].USD.PRICE,
                data.RAW[ticker].USD.VOLUME24HOUR,
                data.RAW[ticker].USD.MKTCAP,
                data.RAW[ticker].USD.CHANGE24HOUR,
                data.RAW[ticker].USD.CHANGEPCT24HOUR/100);
        })
    )));
}

const getOthers = () => {
    AssetClasses[AssetClass.Stock].forEach(ticker => {
        productInfo[ticker] = new Product(ticker, AssetClass.Stock);
    });
    AssetClasses[AssetClass.Bond].forEach(ticker => {
        productInfo[ticker] = new  Product(ticker, AssetClass.Bond);
    });
    AssetClasses[AssetClass.ETF].forEach(ticker => {
        productInfo[ticker] = new  Product(ticker, AssetClass.ETF);
    });
}

const getProductInfo = async () => {
    productInfo = {};
    await getCrypto();
    getOthers();
    return productInfo;
}

export { getProductInfo };