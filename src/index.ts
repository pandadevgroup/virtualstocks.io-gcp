import { key } from "./util/firebase-key";
import * as admin from "firebase-admin";

admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(key))
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