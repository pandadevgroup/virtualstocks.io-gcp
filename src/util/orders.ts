export abstract class OrderData {
	id: string;
	uid: string;
	ticker: string;
	quantity: number;
	error: string | null;
	fulfilled: boolean;
	type: "buy" | "sell" | "short" | "limit";
}

export class Order extends OrderData {
	constructor(data: OrderData) {
		super();
		Object.assign(this, data);
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

	addOrder(order: Order) {
		const { ticker, id } = order;
		if (!this.orders[ticker]) this.orders[ticker] = {};

		this.orders[ticker][id] = order;
	}

	updateOrder(order: Order) {
		// TODO
	}

	removeOrder(order: Order) {
		// TODO
	}
}