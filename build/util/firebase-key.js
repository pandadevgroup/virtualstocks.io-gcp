"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const keyfileExists = fs.existsSync("keys/firebase.json");
exports.key = keyfileExists
    ? fs.readFileSync("keys/firebase.json").toString()
    : process.env.FIREBASE_KEY;
//# sourceMappingURL=firebase-key.js.map