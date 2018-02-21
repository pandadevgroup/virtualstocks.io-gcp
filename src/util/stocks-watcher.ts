import * as socketIOClient from "socket.io-client";

export class StockChange {
	ticker: string;
	price: number;
	time: number;

	constructor(data: { ticker: string, price: number, time: number }) {
		return Object.assign(this, data);
	}

	toString() {
		return `${this.ticker}: $${this.price.toFixed(2)} @ ${new Date(this.time)}`;
	}
}

export class StocksWatcher {
	private callbacks: Function[] = [];
	private socket: SocketIOClient.Socket;

	constructor() {
		this.socket = socketIOClient('https://ws-api.iextrading.com/1.0/last')
		
		this.socket.on('message', message => this.handleMessage(JSON.parse(message)));
		
		// Connect to the channel
		this.socket.on('connect', () => {
			console.log("[Stocks Watcher] Connected to ws-api.iextrading.com.");
		});
		
		this.socket.on('disconnect', () => console.log('[Stocks Watcher] Disconnected from ws-api.iextrading.com.'))
	}

	watch(ticker: string) {
		this.socket.emit("subscribe", ticker);
	}

	stop(ticker: string) {
		this.socket.emit("unsubscribe", ticker);
	}

	onChange(callback: Function) {
		this.callbacks.push(callback);
	}

	private handleMessage(message) {
		const { symbol: ticker, price, time } = message;
		this.callbacks.map(callback => callback(new StockChange({
			ticker, price, time
		})));
	}
}