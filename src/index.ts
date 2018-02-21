import { key } from "./util/firebase-key";
import { Orders } from "./util/orders";
import * as admin from "firebase-admin";

admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(key))
});

const db = admin.firestore();
const orders = new Orders();

db.collection("orders").where("fulfilled", "==", false).onSnapshot(snapshot => {
	console.log("==== NEW SNAPSHOT ====");
	snapshot.docChanges.forEach(change => {
		if (change.type === "added") {
			const id = change.doc.id;
			const order: any = change.doc.data();
			const ticker = order.ticker;
			orders.addOrder(order);

			console.log(`New order: ${id} => ${order.type} ${order.ticker} x${order.quantity}`);
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