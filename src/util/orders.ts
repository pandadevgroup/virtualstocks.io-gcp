import { QueryDocumentSnapshot } from "@google-cloud/firestore";
import { StocksWatcher, StockChange } from "./stocks-watcher";

export abstract class OrderData {
	id: string;
	uid: string;
	ticker: string;
	quantity: number;
	error: string | null;
	fulfilled: boolean;
	type: "buy" | "sell" | "short" | "limit";
	price: number | null;
	limitPrice: number | null;
}

export class Order extends OrderData {
	constructor(data: OrderData | QueryDocumentSnapshot) {
		super();
		if (data instanceof OrderData) {
			return Object.assign(this, data);
		} else {
			return Object.assign(this, {
				id: data.id,
				...data.data()
			});
		}
	}

	toString() {
		return `${this.id} => ${this.type} ${this.ticker} x${this.quantity}`;
	}
}

export class Orders {
	private orders: {
		[ticker: string]: {
			[id: string]: Order
		}
	} = {};
	private callbacks: Function[] = [];
	private stocksWatcher: StocksWatcher;

	constructor() {
		this.stocksWatcher = new StocksWatcher();
		this.stocksWatcher.onChange((change: StockChange) => {
			this.handleStockUpdate(change);
		});
	}

	addOrder(order: Order) {
		const { ticker, id } = order;
		if (!this.orders[ticker]) this.initializeTicker(ticker);

		this.orders[ticker][id] = order;
		this.stocksWatcher.watch(ticker);
	}

	updateOrder(order: Order) {
		const { ticker, id } = order;
		this.orders[ticker][id] = order;
	}

	removeOrder(order: Order) {
		const { ticker, id } = order;
		if (!this.orders[ticker]) return;
		if (this.orders[ticker].hasOwnProperty(id)) delete this.orders[ticker][id];
		
		if (Object.keys(this.orders[ticker]).length === 0) {
			this.removeTicker(ticker);
			this.stocksWatcher.stop(ticker);
		}
	}

	listen(callback: Function) {
		this.callbacks.push(callback);
	}

	private initializeTicker(ticker: string) {
		this.orders[ticker] = {};
	}

	private removeTicker(ticker: string) {
		delete this.orders[ticker];
	}

	private handleStockUpdate(change: StockChange) {
		const { ticker } = change;
		const orders = this.orders[ticker];
		if (!orders) return;

		for (let orderId of Object.keys(orders)) {
			this.checkOrder(orders[orderId], change);
		}
	}

	private checkOrder(order: Order, change: StockChange) {
		const { type } = order;

		if (type === "buy" || type === "sell" || type === "short") {
			this.notifyListeners(order, change);
		} else if (type === "limit") {
			const { limitPrice } = order;
			if (change.price <= limitPrice) {
				this.notifyListeners(order, change);
			}
		}
	}

	private notifyListeners(order: Order, change: StockChange) {
		this.callbacks.map(callback => callback(order, change));
	}
}