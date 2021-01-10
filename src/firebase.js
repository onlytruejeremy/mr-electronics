import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const config = {
//
};

export const app =
  firebase.apps.length > 0 ? "" : firebase.initializeApp(config);
export const db = firebase.firestore();

export default { app, db };
