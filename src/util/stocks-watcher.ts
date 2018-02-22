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
	private socketOpen = false;

	constructor() {
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

	watch(ticker: string) {
		this.socket.emit("subscribe", ticker);
	}

	stop(ticker: string) {
		this.socket.emit("unsubscribe", ticker);
	}

	onChange(callback: Function) {
		this.callbacks.push(callback);
	}

	private checkSocket() {
		const date = new Date();
		const dayOfWeek = date.getDay();
		const hour = date.getUTCHours() + 1;
		const minutes = date.getUTCMinutes();
		// Only open Monday thru Friday (1 through 5)
		if (dayOfWeek === 0 || dayOfWeek === 6) return;

		// Opens 2:30 PM, closes 9 PM UTC
		if (hour == 14) {
			if (minutes >= 29 && !this.socketOpen) {
				// Past 2:29, start trading
				this.socket.open();
			}
		} else if (hour > 14 && hour < 21) {
			if (!this.socketOpen) this.socket.open();
		} else if (hour >= 21 && this.socketOpen) {
			// It's 9, stop trading
			this.socket.close();
		}
	}

	private handleMessage(message) {
		const { symbol: ticker, price, time } = message;
		this.callbacks.map(callback => callback(new StockChange({
			ticker, price, time
		})));
	}
}