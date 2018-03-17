"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fuse = require("fuse.js");
const request = require("request");
class SearchEngine {
    start() {
        this.setupSearch();
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
}
exports.SearchEngine = SearchEngine;
//# sourceMappingURL=search-engine.js.map