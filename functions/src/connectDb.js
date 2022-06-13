const admin = require("firebase-admin");
const credentials = require("../credentials.json");

function connectDb() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });
  }
  return admin.firestore();
}

module.exports = connectDb;
