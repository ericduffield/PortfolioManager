from flask import Flask, Response
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from positions import PositionManager
from orders import Order, OrderManager
from database import Database
from cash import CashManager
from dummy_data import inject_dummy_data
from flask_swagger_ui import get_swaggerui_blueprint


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)
 
SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/swagger.json'  # Our API url (can of course be a local resource)

parser = reqparse.RequestParser()
parser.add_argument('ticker', required=True)
parser.add_argument('asset_class', required=True)
parser.add_argument('side', required=True)
parser.add_argument('type', required=True)
parser.add_argument('quantity', required=True, type=float)
parser.add_argument('price', required=False, type=float)

# Call factory function to create our blueprint
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Portfolio manager"
    }
)

app.register_blueprint(swaggerui_blueprint)

class Positions(Resource):
    def get(self):
        return positions.get_positions()
    
class Orders(Resource):
    def get(self):
        return orders.get_orders()
    
    def post(self):
        args = parser.parse_args()
        orders.send(Order(args['ticker'], args['asset_class'], args['side'], args['type'], args['quantity'], args['price'] if 'price' in args else None))
        return {'Status':'Created'}, 201


class Cash(Resource):
    def get(self):
        return cash.get_cash_balance()

class Performance(Resource):
    def get(self):
        return database.query('''SELECT date, total_value FROM performance''') 
    
api.add_resource(Positions, '/positions')
api.add_resource(Orders, '/orders')
api.add_resource(Cash, '/cash')
api.add_resource(Performance, '/performance')

def print_tables(orders, positions):
    orders_list = orders.get_orders()
    positions_list = positions.get_positions()

    print("\nOrders:")
    for order in orders_list:
        print(order)

    print("\nPositions:")
    for position in positions_list:
        print(position)
    
if __name__ == '__main__':
    reset = True
    
    database = Database(reset)
    cash = CashManager(database)
    positions = PositionManager(database, cash)
    orders = OrderManager(database, positions, cash)
    
    if(reset):
        inject_dummy_data(orders, database)
        
    app.run(debug=True)
    
    # print_tables(orders, positions)
    