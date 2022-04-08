
  const firebaseConfig = {
    apiKey: "AIzaSyCzPJcxjcQxCxNNiMGw6Fl48o_H3N4dqG4",
    authDomain: "comp1800-202210-dtc16.firebaseapp.com",
    projectId: "comp1800-202210-dtc16",
    storageBucket: "comp1800-202210-dtc16.appspot.com",
    messagingSenderId: "966116301191",
    appId: "1:966116301191:web:aef7b649cc7019f7915b22"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();