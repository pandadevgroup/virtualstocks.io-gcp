import * as Fuse from "fuse.js";
import * as request from "request";
import * as express from "express";

export class SearchEngine {
	fuse: Fuse;

	start() {
		this.setupSearch();
		this.setupServer();
	}

	private setupSearch() {
		request(
			"https://api.iextrading.com/1.0/ref-data/symbols",
			{ json: true },
			(error, res, body) => {
				if (error) return console.error(`[Search Engine] setupSearch error: `, error);
				this.setupFuse(body);
			}
		);
	}

	private setupFuse(symbols) {
		let options = {
			shouldSort: true,
			threshold: 0.1,
			location: 0,
			distance: 400,
			maxPatternLength: 32,
			minMatchCharLength: 1,
			keys: ["symbol", "name"]
		};
		this.fuse = new Fuse(symbols, options);
		console.log(`[Search Engine] Fuse ready. ${symbols.length} symbols loaded.`);
	}

	private setupServer() {
		const app = express();
		app.set("port", (process.env.PORT || 3000));

		// CORS
		app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});

		app.get("/search/:search", (req, res) => {
			const search = req.params.search;
			const limit = req.query.limit || 5;
			const results = this.fuse.search(search);
			res.send(results.slice(0, limit));
		});
		
		app.listen(app.get("port"), () => console.log(`[Search Engine] Server listening on port ${app.get("port")}`));
	}
}
