"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIOClient = require("socket.io-client");
class StockChange {
    constructor(data) {
        return Object.assign(this, data);
    }
    toString() {
        return `${this.ticker}: $${this.price.toFixed(2)} @ ${new Date(this.time)}`;
    }
}
exports.StockChange = StockChange;
class StocksWatcher {
    constructor() {
        this.callbacks = [];
        this.socket = socketIOClient('https://ws-api.iextrading.com/1.0/last');
        this.socket.on('message', message => this.handleMessage(JSON.parse(message)));
        // Connect to the channel
        this.socket.on('connect', () => {
            console.log("[Stocks Watcher] Connected to ws-api.iextrading.com.");
        });
        this.socket.on('disconnect', () => console.log('[Stocks Watcher] Disconnected from ws-api.iextrading.com.'));
    }
    watch(ticker) {
        this.socket.emit("subscribe", ticker);
    }
    stop(ticker) {
        this.socket.emit("unsubscribe", ticker);
    }
    onChange(callback) {
        this.callbacks.push(callback);
    }
    handleMessage(message) {
        const { symbol: ticker, price, time } = message;
        this.callbacks.map(callback => callback(new StockChange({
            ticker, price, time
        })));
    }
}
exports.StocksWatcher = StocksWatcher;
//# sourceMappingURL=stocks-watcher.js.map