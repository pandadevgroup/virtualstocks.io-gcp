import * as Fuse from "fuse.js";

let options = {
	shouldSort: true,
	threshold: 0.1,
	location: 0,
	distance: 400,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: ["symbol", "name"]
};

export class SearchEngine {
	fuse: Fuse;
	
	start() {

		let symbols = [
			{
				"symbol": "A",
				"name": "AGILENT TECHNOLOGIES INC",
				"date": "2017-04-19",
				"isEnabled": true
			},
			{
				"symbol": "AA",
				"name": "ALCOA CORP",
				"date": "2017-04-19",
				"isEnabled": true
			},
			{
				"symbol": "AMZN",
				"name": "AMAZON INC",
				"date": "2017-04-19",
				"isEnabled": true
			},
			{
				"symbol": "AMPN",
				"name": "Google AMAZON dINC",
				"date": "2017-04-19",
				"isEnabled": true
			}
		];

		

		this.fuse = new Fuse(symbols, options);
	}
}
