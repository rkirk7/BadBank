const { getAuth } = require("firebase/auth");
const { initializeApp } = require('firebase-admin/app');

var admin = require("firebase-admin");
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

  async function checkAccount(email) {
    try {
        getAuth()
  .getUserByEmail(email)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    return true;
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
    return false;
  });
      } catch (error) {
        throw error;
      }
  }

  module.exports = {checkAccount}