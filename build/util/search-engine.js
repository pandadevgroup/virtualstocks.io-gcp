"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fuse = require("fuse.js");
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
var options = {
    shouldSort: true,
    threshold: 0,
    location: 0,
    distance: 0,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "symbol",
        "name"
    ]
};
var fuse = new Fuse(symbols, options); // "list" is the item array
var result = fuse.search("Ama");
console.log(result);
class SearchEngine {
    start() { }
}
exports.SearchEngine = SearchEngine;
//# sourceMappingURL=search-engine.js.map