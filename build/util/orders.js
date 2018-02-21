"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderData {
}
exports.OrderData = OrderData;
class Order extends OrderData {
    constructor(data) {
        super();
        if (data instanceof OrderData) {
            return Object.assign(this, data);
        }
        else {
            return Object.assign(this, Object.assign({ id: data.id }, data.data()));
        }
    }
    toString() {
        return `${this.id} => ${this.type} ${this.ticker} x${this.quantity}`;
    }
}
exports.Order = Order;
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
    updateOrder(order) {
        // TODO
    }
    removeOrder(order) {
        // TODO
    }
}
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map