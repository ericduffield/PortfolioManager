class Position {
    constructor(position) {
        this.ticker = position[0];
        this.asset_class = position[1];
        this.quantity = position[2];
        this.average_price = position[3];
        this.total_price = this.quantity * this.average_price;
        this.logo = productsDict[this.ticker].logo;
        this.day_change_percentage = (Math.random() - 0.5)/10;
        this.day_change = this.total_price * this.day_change_percentage;
        this.current_price = this.average_price + this.average_price * (Math.random() - 0.5)/5;
        this.total_change = (this.quantity * this.current_price) - this.total_price;
        this.total_change_percentage = this.total_change / this.total_price;
        this.total_current_value = this.quantity * this.current_price;
    }
}

class Order {
    constructor(order) {
        this.id = order[0];
        this.ticker = order[1];
        this.side = order[2];
        this.order_type = order[3];
        this.asset_class = order[4];
        this.quantity = order[5];
        this.average_price = order[6];
        // this.trade_date = order[9];
        this.display_id = order[7];
        this.status = order[8];
        this.filled_quantity = order[9];
        this.logo = productsDict[this.ticker].logo;
        this.total_price = this.quantity * this.average_price;
    }
}

const etfLogo = "./images/etf.png";

const productsDict = {
    "AAPL": {price: 218.18, volume: 22816395, market_cap: 3345000000000, name: "APPLE INC", logo: "https://eodhd.com/img/logos/US/aapl.png"},
    "MSFT": {price: 420.98, volume: 14460133, market_cap: 3129000000000, name: "MICROSOFT CORP", logo: "https://eodhd.com/img/logos/US/MSFT.png"},
    "NVDA": {price: 105.94, volume: 337191644, market_cap: 2609000000000, name: "NVIDIA CORP", logo: "https://eodhd.com/img/logos/US/NVDA.png"},
    "GOOG": {price: 299.72, volume: 18132595, market_cap: 2250000000000, name: "ALPHABET INC", logo: "https://eodhd.com/img/logos/US/goog.png"},
    "AMZN": {price: 181.49, volume: 23936307, market_cap: 1890000000000, name: "AMAZON COM INC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png"},
    "META": {price: 463.97, volume: 6829996, market_cap: 1178000000000, name: "META PLATFORMS INC", logo: "https://freelogopng.com/images/all_img/1664035778meta-icon-png.png"},
    "TSLA": {price: 222.71, volume: 18132595, market_cap: 1120000000000, name: "TESLA INC", logo: "https://cdn.iconscout.com/icon/free/png-256/free-tesla-3521840-2945257.png"},
    "MS": {price: 103.44, volume: 14460133, market_cap: 3129000000000, name: "MORGAN STANLEY", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQag118ifLpCEx2fNF5xRNCPOP7ACQIOmk9UQ&s"},
    "SPY": {price: 541.97, volume: 22816395, market_cap: 3345000000000, name: "SPDR S&P 500 ETF TRUST", logo: etfLogo},
    "VOO": {price: 498.06, volume: 14460133, market_cap: 3129000000000, name: "VANGUARD S&P 500 ETF", logo: etfLogo},
    "VTI": {price: 268.49, volume: 337191644, market_cap: 2609000000000, name: "VANGUARD TOTAL STOCK MARKET ETF", logo: etfLogo},
    "QQQ": {price: 458.17, volume: 18132595, market_cap: 2250000000000, name: "INVESCO QQQ TRUST", logo: etfLogo},
    "US1Y": {price: 4.5725, volume: 23936307, market_cap: 1890000000000, name: "US TREASURY BILL 1 YEAR", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Seal_of_the_United_States_Department_of_the_Treasury.svg/768px-Seal_of_the_United_States_Department_of_the_Treasury.svg.png"},
    "US5Y": {price: 99.8555, volume: 6829996, market_cap: 1178000000000, name: "US TREASURY BILL 5 YEAR", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Seal_of_the_United_States_Department_of_the_Treasury.svg/768px-Seal_of_the_United_States_Department_of_the_Treasury.svg.png"},
    "US10Y": {price: 101.8828, volume: 18132595, market_cap: 1120000000000, name: "US TREASURY BILL 10 YEAR", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Seal_of_the_United_States_Department_of_the_Treasury.svg/768px-Seal_of_the_United_States_Department_of_the_Treasury.svg.png"},
    "US30Y": {price: 103.7422, volume: 14460133, market_cap: 3129000000000, name: "US TREASURY BILL 30 YEAR", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Seal_of_the_United_States_Department_of_the_Treasury.svg/768px-Seal_of_the_United_States_Department_of_the_Treasury.svg.png"},
    "BTC": {name: "BITCOIN", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg"},
    "ETH": {name: "ETHEREUM", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg"},
    "USDT": {name: "TETHER", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg"},
    "BNB": {name: "BNB COIN", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg"},
    "SOL": {name: "SOLANA", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg"},
    "USDC": {name: "USD COIN", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg"},
}

class Product {
    constructor(ticker, asset_class, current_price, volume, market_cap, day_change, day_change_percentage) {
        this.ticker = ticker;
        this.asset_class = asset_class;
        if(current_price == undefined) {
            this.current_price = productsDict[ticker].price;
            this.day_change_percentage = (Math.random() - 0.5)/10;
            this.day_change = this.current_price * this.day_change_percentage;
            this.volume = productsDict[ticker].volume;
            this.market_cap = productsDict[ticker].market_cap;
        }
        else
        {
            this.current_price = current_price;
            this.volume = volume;
            this.market_cap = market_cap;
            this.day_change = day_change;
            this.day_change_percentage = day_change_percentage;
        }
        this.bid = this.current_price * 0.9999;
        this.ask = this.current_price * 1.0001;
    }
}

export { Position, Order, Product, productsDict };