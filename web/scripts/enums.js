const AssetClass = {
    Stock: 'Stock',
    Crypto: 'Crypto',
    ETF: 'ETF',
    Bond: 'Bond'
}

const Side = {
    Buy: 'Buy',
    Sell: 'Sell'
}

const Type = {
    Market: 'Market',
    Limit: 'Limit',
    Stop: 'Stop'
}
const Status = {
    New: 'New',
    PartiallyFilled: 'Partially Filled',
    Filled: 'Filled',
    Rejected: 'Rejected'
}

const Styles = {
    Green: 'green',
    Red: 'red'
}

const Endpoint = {
    Orders: '/orders',
    Positions: '/positions',
    Cash: '/cash',
    Performance: '/performance'
}

export { AssetClass, Side, Type, Status, Styles, Endpoint }