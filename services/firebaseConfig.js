import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCU6cJUj1B-AONQUdCD0A_qug7gd9wlD6M",
  authDomain: "aedlocator-31104.firebaseapp.com",
  projectId: "aedlocator-31104",
  storageBucket: "aedlocator-31104.appspot.com",
  messagingSenderId: "351423384880",
  appId: "1:351423384880:web:2c19ab0b0caa36fed2ccf5",
  measurementId: "G-JW27P0D9Z8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app }
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
