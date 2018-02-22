"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_key_1 = require("./util/firebase-key");
const orders_1 = require("./util/orders");
const admin = require("firebase-admin");
const request = require("request");
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(firebase_key_1.key))
});
const db = admin.firestore();
const orders = new orders_1.Orders();
orders.listen((order, change) => {
    console.log(`Stock Update: ${change}`);
    request({
        url: "https://us-central1-virtualstocks-io.cloudfunctions.net/orders/update",
        method: "POST",
        json: true,
        body: {
            order: order,
            price: change.price,
            timestamp: change.time
        }
    }, ((error, response, body) => {
        if (error) {
            console.error(`[Stock Update] Error: `, error);
        }
        else {
            console.log(`[Stock Update] Response from firebase: `, body);
        }
    }));
    orders.removeOrder(order);
});
db.collection("orders").where("fulfilled", "==", false).onSnapshot(snapshot => {
    console.log("==== NEW SNAPSHOT ====");
    snapshot.docChanges.forEach(change => {
        const order = new orders_1.Order(change.doc);
        if (change.type === "added") {
            orders.addOrder(order);
            console.log(`New order: ${order}`);
        }
        if (change.type === "modified") {
            orders.updateOrder(order);
            console.log(`Modified order: ${order}`);
        }
        if (change.type === "removed") {
            orders.removeOrder(order);
            console.log(`Removed order: ${order}`);
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