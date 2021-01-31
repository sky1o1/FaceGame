import firebase from "firebase";
import 'firebase/firestore'
import "firebase/storage";
import "firebase/auth"


var firebaseConfig = {
    apiKey: "AIzaSyBq4M9gbJUpjtVxKuvTn95gRDtpwLISQXg",
    authDomain: "facegameapi.firebaseapp.com",
    projectId: "facegameapi",
    storageBucket: "facegameapi.appspot.com",
    messagingSenderId: "297533963129",
    appId: "1:297533963129:web:2e56536dd63904fa22cda8",
    measurementId: "G-25M2CW86VD"
  };
 
  firebase.initializeApp(firebaseConfig);
const firebaseAnalytics = firebase.analytics();

const storage = firebase.storage();
const storeFire = firebase.firestore();
storeFire.settings({ timestampsInSnapshots: true });
const auth = firebase.auth()
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { storage, storeFire, timestamp, firebase, firebaseConfig, firebaseAnalytics, auth as default, auth };