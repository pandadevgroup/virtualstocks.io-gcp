"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Orders {
    constructor() {
        this.orders = {};
    }
    addOrder(order) {
        const { ticker, id } = order;
        if (!this.orders[ticker])
            this.orders[ticker] = {};
        this.orders[ticker][id] = order;
    }
}
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map