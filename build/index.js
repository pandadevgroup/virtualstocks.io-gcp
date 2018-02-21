"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_key_1 = require("./util/firebase-key");
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(firebase_key_1.key))
});
const db = admin.firestore();
db.collection("orders").where("fulfilled", "==", false).onSnapshot(snapshot => {
    console.log("==== NEW SNAPSHOT ====");
    snapshot.docChanges.forEach(change => {
        if (change.type === "added") {
            console.log("New order: ", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified order: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed order: ", change.doc.data());
        }
    });
});
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
function shutdown() {
    console.log("Shutting down");
    process.exit(0);
}
//# sourceMappingURL=index.js.map