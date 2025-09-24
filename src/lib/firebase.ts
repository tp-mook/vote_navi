// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDrhi3e40Xjg3rkuNu0TZzRR1O7IrQWaaE",
    authDomain: "vote-navi.firebaseapp.com",
    projectId: "vote-navi",
    storageBucket: "vote-navi.firebasestorage.app",
    messagingSenderId: "36582474189",
    appId: "1:36582474189:web:6319f51b1a3ec7fd570484"
  };

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// Firestoreのインスタンスを取得
const db = getFirestore(app);

export { db };