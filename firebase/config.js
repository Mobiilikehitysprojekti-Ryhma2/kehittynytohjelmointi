import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
import Constants from 'expo-constants';

const firebaseConfig = {
    apiKey: "omat tiedot",

    authDomain: "omat tiedot",
  
    projectId: "omat tiedot",
  
    storageBucket: "omat tiedot",
  
    messagingSenderId: "omat tiedot",
  
    appId: "omat tiedot",
  
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

// Firebase testing *****
const MESSAGES = "messages"
const USERINFO = "userInfo"
//*****


export {
  firestore,
  MESSAGES,
  USERINFO,
  collection,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
  getAuth, 
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signOut,
  deleteUser
};
