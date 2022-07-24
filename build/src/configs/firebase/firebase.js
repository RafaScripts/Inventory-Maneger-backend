"use strict";
//const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
//const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
const storage = (0, storage_1.getStorage)(app);
//import file from '../../../teste.pdf';
//import file from '../../../vercel.json';
function getCities() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(db, "testes"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
            const storageRef = (0, storage_1.ref)(storage, 'some-child');
            const rpRef = (0, storage_1.ref)(storage, 'teste.pdf');
            console.log(storageRef, rpRef);
            console.log("Document written with ID: ");
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }
    });
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
exports.default = getCities;
//# sourceMappingURL=firebase.js.map