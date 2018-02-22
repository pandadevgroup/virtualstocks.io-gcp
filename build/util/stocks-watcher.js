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
        this.socketOpen = false;
        this.socket = socketIOClient('https://ws-api.iextrading.com/1.0/last', {
            autoConnect: false
        });
        this.socket.on('message', message => this.handleMessage(JSON.parse(message)));
        // Connect to the channel
        this.socket.on('connect', () => {
            console.log("[Stocks Watcher] Connected to ws-api.iextrading.com.");
            this.socketOpen = true;
        });
        this.socket.on('disconnect', () => {
            this.socketOpen = false;
            console.log('[Stocks Watcher] Disconnected from ws-api.iextrading.com.');
        });
        this.checkSocket();
        setInterval(this.checkSocket.bind(this), 1000 * 60);
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
    checkSocket() {
        const date = new Date();
        const hour = date.getUTCHours() + 1;
        const minutes = date.getUTCMinutes();
        // Opens 2:30 PM, closes 9 PM
        if (hour == 2) {
            if (minutes >= 29 && !this.socketOpen) {
                // Past 2:29, start trading
                this.socket.open();
            }
        }
        else if (hour == 9 && this.socketOpen) {
            // It's 9, stop trading
            this.socket.close();
        }
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