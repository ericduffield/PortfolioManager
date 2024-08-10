from enums import Side

class PositionManager:
    def __init__(self, database, cash):
        self.database = database
        self.cash = cash

    def update_positions(self, order, position):
        if order.side == Side.BUY.value:
            self._buy(order, position)
        elif order.side == Side.SELL.value:
            self._sell(order, position)
        
    def _buy(self, order, position):
        
        # if a position with the ticker already exists
        if position:
            # calculate the total price of the new position
            current_total_price = position.quantity * position.average_price
            new_order_total_price = order.filled_quantity * order.average_price
            new_position_total_price = current_total_price + new_order_total_price
            
            # calculate the new quantity and average price of the position
            position.quantity += order.filled_quantity
            position.average_price = new_position_total_price / position.quantity
            
            command = """UPDATE positions SET quantity = %s, average_price = %s WHERE ticker = %s"""
            values = (position.quantity, position.average_price, order.ticker)
            self.database.execute(command, values)
            
        else:
            # otherwise create a new position
            command = """INSERT INTO positions (ticker, asset_class, quantity, average_price) VALUES (%s, %s, %s, %s)"""
            values = (order.ticker, order.asset_class, order.filled_quantity, order.average_price)
            self.database.execute(command, values)
        
        # Decrease cash
        amount = order.filled_quantity * order.average_price
        self.cash.decrease_cash(amount)
    
    def _sell(self, order, position):
        if position.quantity == order.filled_quantity:
            # if the entire position is sold, delete the position
            command = """DELETE FROM positions WHERE ticker = %s"""
            values = (order.ticker,)
            self.database.execute(command, values)
        else:
            # otherwise update the position
            position.quantity -= order.filled_quantity
            command = """UPDATE positions SET quantity = %s, average_price = %s WHERE ticker = %s"""
            values = (position.quantity, position.average_price, order.ticker)
            self.database.execute(command, values)
            
        # Increase cash
        amount = order.filled_quantity * order.average_price
        self.cash.increase_cash(amount)
        
    def get_positions(self):
        return self.database.query("SELECT ticker, asset_class, quantity, average_price FROM positions")

class Position():
    # ticker: AAPL
    # asset_class: Stock, Bond, Crypto
    # quantity: number of shares owned
    # total_price: total price paid for shares

    def __init__(self, ticker, asset_class, quantity, average_price):
        self.ticker = ticker
        self.asset_class = asset_class
        self.quantity = quantity
        self.average_price = average_price
    
    def __repr__(self):
        return (f"Position(ticker={self.ticker!r}, asset_class={self.asset_class!r}, "
                f"quantity={self.quantity!r}, average_price={self.average_price!r})")