from simulator import Simulator
import random
import string
from enums import Status, Side
from positions import Position

class OrderManager:
    def __init__(self, database, positions, cash):
        self.database = database
        self.positions = positions
        self.cash = cash
    
    def send(self, order):
        self.order = Simulator.update_order(order)
        
        # check if position with matching ticker exists
        positions = self.database.query("SELECT ticker, asset_class, quantity, average_price FROM positions WHERE ticker = %s", (order.ticker,))
        
        # Validation
        position = None
        if positions:
            if len(positions) > 1:
                raise Exception('Multiple positions found for ticker')
            position = Position(positions[0][0], positions[0][1], positions[0][2], positions[0][3])
            
        if order.side == Side.BUY.value:
            # check if there is enough cash to buy the order
            if self.cash.get_cash_balance() < order.filled_quantity * order.average_price:
                raise Exception('Not enough cash to buy this quantity')
        elif order.side == Side.SELL.value:
            if not position:
                raise Exception('Position does not exist, cannot sell')
            # ensure that the position has enough quantity to sell
            if position.quantity < order.filled_quantity:
                raise Exception('Position does not have enough quantity to sell')
            
        # Insert order into database
        command = """INSERT INTO orders (ticker, asset_class, side, order_type, quantity, average_price,
                         status, display_id, filled_quantity) 
                     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        values = (self.order.ticker, self.order.asset_class, self.order.side, self.order.order_type, 
                  self.order.quantity, self.order.average_price, self.order.status, self.order.display_id, self.order.filled_quantity)
        self.database.execute(command, values)
        
        # only update positions if there are fills
        if order.filled_quantity > 0:
            self.positions.update_positions(order, position)
    
    def get_orders(self):
        return self.database.query("SELECT order_id, ticker, side, order_type, asset_class, quantity, average_price, display_id, status, filled_quantity FROM orders")
    
class Order():
    # display_id: id that will be displayed in ui, looks better than using the id from the database
    # ticker: AAPL
    # asset_class: Stock, Bond, Crypto
    # side: Buy, Sell
    # type: Market, Limit
    # quantity: Order quantity
    # average_price: limit price, or execution price of order ex 220.99
    # trade_date: 01/01/2021
    # status: New, Filled, Partially Filled, Rejected
    # filled_quantity: Quantity that has been filled

    def __init__(self, ticker, asset_class, side, order_type, quantity, average_price):
        # generate a random order id, use string and numbers and dashes
        self.display_id = ''.join(random.choices(string.ascii_letters + string.digits + '-', k=20))
        self.ticker = ticker
        self.asset_class = asset_class
        self.side = side
        self.order_type = order_type
        self.quantity = quantity
        self.average_price = average_price
        self.status = Status.NEW.value

    def __repr__(self):
        return (f"Order(order_id={self.order_id!r}, ticker={self.ticker!r}, asset_class={self.asset_class!r}, "
                f"side={self.side!r}, order_type={self.order_type!r}, quantity={self.quantity!r}, "
                f"status={self.status!r}, display_id={self.display_id!r}, price={self.price!r})")
