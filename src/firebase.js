import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const config = {
  apiKey: "AIzaSyB38zEmgjKdiRwStYu8d8sjMyOaKWqVOJs",
  authDomain: "mr-electronics.firebaseapp.com",
  projectId: "mr-electronics",
  storageBucket: "mr-electronics.appspot.com",
  messagingSenderId: "595281694957",
  appId: "1:595281694957:web:3d1240315f78a0188efce4",
  measurementId: "G-S2RE4LLSL4"
};

export const app =
  firebase.apps.length > 0 ? "" : firebase.initializeApp(config);
export const db = firebase.firestore();

export default { app, db };
