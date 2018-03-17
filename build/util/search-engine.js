"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fuse = require("fuse.js");
const request = require("request");
const express = require("express");
class SearchEngine {
    start() {
        this.setupSearch();
        this.setupServer();
    }
    setupSearch() {
        request("https://api.iextrading.com/1.0/ref-data/symbols", { json: true }, (error, res, body) => {
            if (error)
                return console.error(`[Search Engine] setupSearch error: `, error);
            this.setupFuse(body);
        });
    }
    setupFuse(symbols) {
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
    setupServer() {
        const app = express();
        app.get("/search/:search", (req, res) => res.send('Hello World! You said ' + req.params.search));
        app.listen(3000, () => console.log("[Search Engine] Listening on port 3000"));
    }
}
exports.SearchEngine = SearchEngine;
//# sourceMappingURL=search-engine.js.map