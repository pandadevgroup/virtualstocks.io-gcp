"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const keyfileExists = fs.existsSync("keys/firebase.json");
const key = keyfileExists
    ? fs.readFileSync("keys/firebase.json").toString()
    : process.env.FIREBASE_KEY;
console.log(key);
setInterval(() => console.log(new Date().toString()), 1000);
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
function shutdown() {
    console.log("Shutting down");
    process.exit(0);
}
//# sourceMappingURL=index.js.map