// src/lib/firebase.ts

import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // getAuthをインポート

const firebaseConfig = {
    apiKey: "AIzaSyDrhi3e40Xjg3rkuNu0TZzRR1O7IrQWaaE",
    authDomain: "vote-navi.firebaseapp.com",
    projectId: "vote-navi",
    storageBucket: "vote-navi.firebasestorage.app",
    messagingSenderId: "36582474189",
    appId: "1:36582474189:web:6319f51b1a3ec7fd570484"
  };

// Next.jsのサーバーサイドとクライアントサイドでの重複初期化を防ぐ
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app); // 初期化済みのappを使ってauthを取得

// dbとauthをエクスポートする
export { db, auth };