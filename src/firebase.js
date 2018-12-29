import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDqft955q3BJCJq17QohTC92bq55pWXCDQ",
  authDomain: "baroque-identities.firebaseapp.com",
  databaseURL: "https://baroque-identities.firebaseio.com",
  projectId: "baroque-identities",
  storageBucket: "baroque-identities.appspot.com",
  messagingSenderId: "21984813341"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
