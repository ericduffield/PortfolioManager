from enums import Type, Status, Side

class Simulator():
    @staticmethod
    def update_order(order):
        order.filled_quantity = order.quantity
        
        # if market order or sell order, full fill
        if order.order_type == Type.MARKET.value or order.side == Side.SELL.value:
            order.status = Status.FILLED.value
        # otherwise if order is limit, use following logic:
        # 1-25: Full fill
        # 26-50: Partial Fill
        # 51-75: Reject
        # 76+: Remains in new state, No fills
        elif order.order_type == Type.LIMIT.value:
            if order.quantity <= 25:
                order.status = Status.FILLED.value
            elif order.quantity <= 50:
                order.status = Status.PARTIALLY_FILLED.value
                order.filled_quantity = order.quantity - 25
            elif order.quantity <= 75:
                order.status = Status.REJECTED.value
                order.filled_quantity = 0
            else:
                order.status = Status.NEW.value
                order.filled_quantity = 0
        else:
            raise Exception('Unknown order type')
        return order