import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firebase-storage';

let firebaseConfig = {

    apiKey: "AIzaSyB8Q_DK2Q1iZ9hGNN2TqY8W81MfdL8zcjo",
    authDomain: "sujeitocoder.firebaseapp.com",
    databaseURL: "https://sujeitocoder.firebaseio.com",
    projectId: "sujeitocoder",
    storageBucket: "sujeitocoder.appspot.com",
    messagingSenderId: "18182191029",
    appId: "1:18182191029:web:8e1c70c997f5f7c8964bfc"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);

  }

  export default firebase;