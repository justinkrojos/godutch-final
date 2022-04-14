import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCGa9oRgjdXuPp-Jit4ZDsX5l21M3u6_9c",
  authDomain: "go-dutch-78809.firebaseapp.com",
  projectId: "go-dutch-78809",
  storageBucket: "go-dutch-78809.appspot.com",
  messagingSenderId: "454161827850",
  appId: "1:454161827850:web:eafce57bb0eebaaa2537f3",
  measurementId: "G-GWH40RR9CK",
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

// avoid deprecated warnings
db.settings({
  timestampsInSnapshots: true,
});

export default Firebase;
