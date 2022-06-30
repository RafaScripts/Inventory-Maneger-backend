//const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
//const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCizGGmuBrZmqBrOJX4sF8vPjfsSETjJvY",
  authDomain: "syspos-backend.firebaseapp.com",
  databaseURL: "https://syspos-backend-default-rtdb.firebaseio.com",
  projectId: "syspos-backend",
  storageBucket: "syspos-backend.appspot.com",
  messagingSenderId: "865035299073",
  appId: "1:865035299073:web:a988f29229026418085300",
  measurementId: "G-YPE2F16Q1J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

//import file from '../../../teste.pdf';

//import file from '../../../vercel.json';




async function getCities(){
  try {
    const querySnapshot = await getDocs(collection(db, "testes"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });

    const storageRef = ref(storage, 'some-child');
    const rpRef = ref(storage, 'teste.pdf');

    console.log(storageRef, rpRef);


    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}




// Get a list of cities from your database
/*
async function getCities(db) {
  const citiesCol = collection(db, 'users');

  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  console.log(cityList);
  return cityList;
}
*/

export default getCities;



