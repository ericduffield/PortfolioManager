from orders import Order
from enums import AssetClass, Side, Type

# Inject dummy data into the database
def inject_dummy_data(orders, database):
    
    database.execute("INSERT INTO cash (balance) VALUES (%s)", (423957.23,))
    
    # Bonds
    orders.send(Order('US1Y', AssetClass.BOND.value, Side.BUY.value, Type.MARKET.value, 4500, 4.9342))
    orders.send(Order('US30Y', AssetClass.BOND.value, Side.BUY.value, Type.MARKET.value, 195, 101.7422))
    orders.send(Order('US10Y', AssetClass.BOND.value, Side.BUY.value, Type.MARKET.value, 400, 99.8828))
    orders.send(Order('US5Y', AssetClass.BOND.value, Side.BUY.value, Type.MARKET.value, 255, 97.8423))
    orders.send(Order('US1Y', AssetClass.BOND.value, Side.SELL.value, Type.LIMIT.value, 10, 4.5125))
    orders.send(Order('US10Y', AssetClass.BOND.value, Side.SELL.value, Type.LIMIT.value, 200, 101.7828))
    orders.send(Order('US30Y', AssetClass.BOND.value, Side.SELL.value, Type.LIMIT.value, 10, 103.6422))
    orders.send(Order('US5Y', AssetClass.BOND.value, Side.SELL.value, Type.LIMIT.value, 45, 99.7555))
    
    # ETFs
    orders.send(Order('SPY', AssetClass.ETF.value, Side.BUY.value, Type.LIMIT.value, 50, 543.45))
    orders.send(Order('SPY', AssetClass.ETF.value, Side.BUY.value, Type.MARKET.value, 30, 543.45))
    orders.send(Order('QQQ', AssetClass.ETF.value, Side.BUY.value, Type.LIMIT.value, 100, 450.12))
    orders.send(Order('VTI', AssetClass.ETF.value, Side.BUY.value, Type.LIMIT.value, 75, 260.12))
    orders.send(Order('VOO', AssetClass.ETF.value, Side.BUY.value, Type.MARKET.value, 25, 491.06))
    orders.send(Order('SPY', AssetClass.ETF.value, Side.BUY.value, Type.LIMIT.value, 75, 530.12))
    orders.send(Order('VTI', AssetClass.ETF.value, Side.BUY.value, Type.MARKET.value, 95, 269.12))
    orders.send(Order('QQQ', AssetClass.ETF.value, Side.BUY.value, Type.MARKET.value, 50, 448.17))
    orders.send(Order('VOO', AssetClass.ETF.value, Side.BUY.value, Type.LIMIT.value, 50, 490.12))
    
    # Crypto
    orders.send(Order('BTC', AssetClass.CRYPTO.value, Side.BUY.value, Type.MARKET.value, 0.5445, 10234.13))
    orders.send(Order('ETH', AssetClass.CRYPTO.value, Side.BUY.value, Type.MARKET.value, 13.2323, 3012.50))
    orders.send(Order('BNB', AssetClass.CRYPTO.value, Side.BUY.value, Type.MARKET.value, 58.34, 547.73))
    orders.send(Order('BTC', AssetClass.CRYPTO.value, Side.SELL.value, Type.LIMIT.value, 0.2345, 66545.34))
    orders.send(Order('SOL', AssetClass.CRYPTO.value, Side.BUY.value, Type.MARKET.value, 46.45, 129.40))
    orders.send(Order('USDT', AssetClass.CRYPTO.value, Side.BUY.value, Type.MARKET.value, 10000, 1))
    orders.send(Order('USDC', AssetClass.CRYPTO.value, Side.BUY.value, Type.MARKET.value, 10000, 1))
    orders.send(Order('BNB', AssetClass.CRYPTO.value, Side.SELL.value, Type.LIMIT.value, 21.34, 589.21))
    orders.send(Order('ETH', AssetClass.CRYPTO.value, Side.SELL.value, Type.LIMIT.value, 6.1234, 3112.50))
    
    # Stocks
    orders.send(Order('MS', AssetClass.STOCK.value, Side.BUY.value, Type.MARKET.value, 89, 105.89))
    orders.send(Order('TSLA', AssetClass.STOCK.value, Side.BUY.value, Type.LIMIT.value, 75, 210.12))
    orders.send(Order('AAPL', AssetClass.STOCK.value, Side.BUY.value, Type.MARKET.value, 150, 205.83))
    orders.send(Order('AMZN', AssetClass.STOCK.value, Side.BUY.value, Type.LIMIT.value, 100, 170.12))
    orders.send(Order('META', AssetClass.STOCK.value, Side.BUY.value, Type.LIMIT.value, 5, 469.97))
    orders.send(Order('MSFT', AssetClass.STOCK.value, Side.BUY.value, Type.LIMIT.value, 50, 426.23))
    orders.send(Order('GOOG', AssetClass.STOCK.value, Side.BUY.value, Type.LIMIT.value, 20, 298.12))
    orders.send(Order('TSLA', AssetClass.STOCK.value, Side.BUY.value, Type.LIMIT.value, 25, 202.32))
    orders.send(Order('MS', AssetClass.STOCK.value, Side.BUY.value, Type.LIMIT.value, 120, 90.12))
    orders.send(Order('META', AssetClass.STOCK.value, Side.BUY.value, Type.LIMIT.value, 50, 469.97))
    orders.send(Order('MSFT', AssetClass.STOCK.value, Side.BUY.value, Type.LIMIT.value, 80, 380.56))
    orders.send(Order('NVDA', AssetClass.STOCK.value, Side.BUY.value, Type.MARKET.value, 45, 101.94))
    orders.send(Order('GOOG', AssetClass.STOCK.value, Side.BUY.value, Type.LIMIT.value, 75, 299.72))
    orders.send(Order('AAPL', AssetClass.STOCK.value, Side.SELL.value, Type.LIMIT.value, 75, 234.12))
    
    # Add performance data
    values = [("2023-09-01",  345689.56),
              ("2023-10-01",  365464.90),
              ("2023-11-01",  354685.47),
              ("2023-12-01",  376855.23),
              ("2024-01-01",  366855.68),
              ("2024-02-01",  395000.67),
              ("2024-03-01",  406340.93),
              ("2024-04-01",  422674.58),
              ("2024-05-01",  414468.92),
              ("2024-06-01",  425152.71),
              ("2024-07-01",  433675.45)]
    
    database.executemany("INSERT INTO performance (date, total_value) VALUES (%s, %s)", values)
    