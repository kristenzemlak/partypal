import firebase from 'firebase'; 

const firebaseConfig = {
    apiKey: "AIzaSyBuoqQPxnn9eM0aRSBsjPUi4ykonUwyGPs",
    authDomain: "my-potluck-pal.firebaseapp.com",
    databaseURL: "https://my-potluck-pal.firebaseio.com",
    projectId: "my-potluck-pal",
    storageBucket: "",
    messagingSenderId: "788671361246",
    appId: "1:788671361246:web:5d9d6f805790f0a568924f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase; 