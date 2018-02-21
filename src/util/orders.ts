import { QueryDocumentSnapshot } from "@google-cloud/firestore";

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

	addOrder(order: Order) {
		const { ticker, id } = order;
		if (!this.orders[ticker]) this.orders[ticker] = {};

		this.orders[ticker][id] = order;
	}

	updateOrder(order: Order) {
		const { ticker, id } = order;
		this.orders[ticker][id] = order;
	}

	removeOrder(order: Order) {
		const { ticker, id } = order;
		delete this.orders[ticker][id];
		
		if (Object.keys(this.orders[ticker]).length === 0) delete this.orders[ticker];
	}
}