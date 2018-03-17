import * as fs from "fs";

const keyfileExists = fs.existsSync("keys/firebase.json");

export const key = keyfileExists
	? fs.readFileSync("keys/firebase.json").toString()
	: process.env.FIREBASE_KEY;