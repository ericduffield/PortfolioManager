class CashManager:
    def __init__(self, database):
        self.database = database   
        
    def decrease_cash(self, amount):
        self._update_cash(-1*amount)
    
    def increase_cash(self, amount):
        self._update_cash(amount)
        
    def _update_cash(self, amount):
        curr_balance = self.get_cash_balance()
        values = (curr_balance + amount,)
        command = '''UPDATE cash SET balance = %s WHERE id = 1''' # First row
        self.database.execute(command, values)

    def get_cash_balance(self):
        # Get the first row (should only contain one row)
        rows = self.database.query('''SELECT balance FROM cash LIMIT 1''')
        
        if not rows:
            raise Exception('No cash balance found')
        
        return float(rows[0][0])
        