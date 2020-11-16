import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAtS9wQOchLTGkCLKgBqI2mYIr8RLWDDjA",
    authDomain: "parcialsalarios.firebaseapp.com",
    databaseURL: "https://parcialsalarios.firebaseio.com",
    projectId: "parcialsalarios",
    storageBucket: "parcialsalarios.appspot.com",
    messagingSenderId: "849347072055",
    appId: "1:849347072055:web:813aadf83b73d01b0e2fb2"
  });

  export const db = app.firestore();
  export const auth = app.auth();
  export default app;
  
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export const googleSignUp = () => {
    auth.signInWithPopup(provider);
  };
  