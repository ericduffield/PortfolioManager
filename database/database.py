import mysql.connector as mc
from mysql.connector import pooling

class Database:
    def __init__(self, reset = False):
        self.connection_pool = pooling.MySQLConnectionPool(pool_name="pool",
                                                           pool_size=32,
                                                           pool_reset_session=True,
                                                           host='localhost',
                                                           database='portfolio',
                                                           user='root',
                                                           password='c0nygre')
        conn = self.connection_pool.get_connection()
        cursor = conn.cursor()
        
        if(reset):
            cursor.execute("DROP DATABASE IF EXISTS portfolio")
            
        # create database called portfolio if it does not already exists
        cursor.execute("CREATE DATABASE IF NOT EXISTS portfolio")
        cursor.execute("USE portfolio")

        # Create positions table if it does not already exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS positions(
            
            ticker VARCHAR(255) NOT NULL,
            asset_class ENUM('Stock', 'ETF', 'Bond', 'Crypto') NOT NULL, 
            quantity FLOAT NOT NULL,
            average_price FLOAT NOT NULL
        
        )''')

        # create table called orders if it does not already exist
        cursor.execute("""CREATE TABLE IF NOT EXISTS orders (
            
            order_id INT AUTO_INCREMENT PRIMARY KEY, 
            ticker VARCHAR(255) NOT NULL,
            side ENUM('Buy','Sell') NOT NULL,
            order_type ENUM('Market','Limit') NOT NULL,
            asset_class ENUM('Stock', 'ETF', 'Bond', 'Crypto') NOT NULL, 
            quantity FLOAT NOT NULL, 
            average_price FLOAT NOT NULL, 
            display_id VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            filled_quantity FLOAT NOT NULL
            
            )""")
        
        # Create performance table if it does not already exist
        cursor.execute("""CREATE TABLE IF NOT EXISTS performance (
            date VARCHAR(255) NOT NULL,
            total_value FLOAT NOT NULL
            )""")
        
        # Create cash table if it does not already exist
        cursor.execute('''CREATE TABLE IF NOT EXISTS cash (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            balance DECIMAL(20,2) NOT NULL 
                            )''')
        
        cursor.close()
        conn.close()
        
    def execute(self, command, values):
        conn = self.connection_pool.get_connection()
        cursor = conn.cursor(buffered=False)
        cursor.execute(command, values)
        conn.commit()
        cursor.close()
        conn.close()
        
    def executemany(self, command, values):
        conn = self.connection_pool.get_connection()
        cursor = conn.cursor(buffered=False)
        cursor.executemany(command, values)
        conn.commit()
        cursor.close()
        conn.close()
    
    def query(self, command, values = None):
        conn = self.connection_pool.get_connection()
        cursor = conn.cursor(buffered=False)
        cursor.execute(command, values)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return rows