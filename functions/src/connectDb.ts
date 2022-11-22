import admin from "firebase-admin";
import credentials from "../credentials.json";

export default function connectDb() {
  let credentials: any;
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });
  }
  return admin.firestore();
}
