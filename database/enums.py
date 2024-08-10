from enum import Enum

class AssetClass(Enum):
    STOCK = "Stock"
    BOND = "Bond"
    CRYPTO = "Crypto"
    ETF = "ETF"

class Side(Enum):
    BUY = "Buy"
    SELL = "Sell"

class Type(Enum):
    MARKET = "Market"
    LIMIT = "Limit"

class Status(Enum):
    NEW = "New"
    FILLED = "Filled"
    PARTIALLY_FILLED = "Partially Filled"
    REJECTED = "Rejected"
