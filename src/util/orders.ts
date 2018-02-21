export interface Order {
	id: string;
	uid: string,
	ticker: string,
	quantity: number,
	error: string | null,
	fulfilled: boolean,
	type: "buy" | "sell" | "short" | "limit"
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
}