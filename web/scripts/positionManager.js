import { Position } from './classes.js';
import { getPositions } from './api.js';
import { getProductInfo } from './market_data.js';

class PositionManager {
    constructor() {
        this.positionDict = [];
    }

    async getPositions() {
        let [productInfo, [positions, dummy]] = await Promise.all([getProductInfo(), getPositions()]);

        this.positionDict = []
        positions.forEach(pos => {
            let position = new Position(pos);

            let product = productInfo[position.ticker];

            if (product) {
                position.total_change = (position.quantity * product.current_price) - position.total_price;
                position.total_change_percentage = position.total_change / position.total_price;
                position.current_price = product.current_price;
                position.day_change = product.day_change * position.quantity;
                position.day_change_percentage = product.day_change_percentage / 100;
                position.total_current_value = position.quantity * product.current_price;
            }

            this.positionDict[position.ticker] = position;
        });

        return [this.positionDict, productInfo, dummy];
    }

    filterPositions(assetClass) {
        return Object.values(this.positionDict).filter(position => position.asset_class == assetClass).map(position => {
            return [position.ticker, position.total_current_value];
        });

    }
}

export { PositionManager };