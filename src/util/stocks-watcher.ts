export interface StockChange {

}

export class StocksWatcher {
	watch(ticker: string) {}
	stop(ticker: string) {}
	onChange(callback: Function) {}
}