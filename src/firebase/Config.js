import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

let config = {
	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_FIREBASE_APPID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const auth_ = firebase.auth;
export const db = firebase.firestore();
export const firestore = firebase.firestore;
export const fb = firebase;

// if (window.location.hostname.includes("localhost")) {
// 	db.useEmulator("localhost", 8080);
// 	auth.useEmulator("http://localhost:9099");
// }