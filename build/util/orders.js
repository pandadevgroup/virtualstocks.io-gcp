"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stocks_watcher_1 = require("./stocks-watcher");
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
        this.stocksWatcher = new stocks_watcher_1.StocksWatcher();
        this.stocksWatcher.onChange((change) => {
            console.log(change.toString());
        });
    }
    addOrder(order) {
        const { ticker, id } = order;
        if (!this.orders[ticker])
            this.initializeTicker(ticker);
        this.orders[ticker][id] = order;
    }
    updateOrder(order) {
        const { ticker, id } = order;
        this.orders[ticker][id] = order;
    }
    removeOrder(order) {
        const { ticker, id } = order;
        delete this.orders[ticker][id];
        if (Object.keys(this.orders[ticker]).length === 0)
            this.removeTicker(ticker);
    }
    initializeTicker(ticker) {
        this.orders[ticker] = {};
        this.stocksWatcher.watch(ticker);
    }
    removeTicker(ticker) {
        delete this.orders[ticker];
        this.stocksWatcher.stop(ticker);
    }
}
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map