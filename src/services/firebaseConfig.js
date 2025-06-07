import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDA8ipwRFxGfQtK6mAB0-azswEZ7uDtgGE",
  authDomain: "tangan-bicara.firebaseapp.com",
  projectId: "tangan-bicara",
  storageBucket: "tangan-bicara.firebasestorage.app",
  messagingSenderId: "722332494649",
  appId: "1:722332494649:web:1d0b474797b6e18b5b16e8",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
