import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAtS9wQOchLTGkCLKgBqI2mYIr8RLWDDjA",
    authDomain: "parcialsalarios.firebaseapp.com",
    databaseURL: "https://parcialsalarios.firebaseio.com",
    projectId: "parcialsalarios",
    storageBucket: "parcialsalarios.appspot.com",
    messagingSenderId: "849347072055",
    appId: "1:849347072055:web:813aadf83b73d01b0e2fb2"
  };
  const fb =  firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();