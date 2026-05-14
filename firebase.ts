import {
  initializeApp,
  getApps,
} from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey:
    "AIzaSyBRH6U0IAz_LxK1jslhPDT6VEKnGFi_aKE",

  authDomain:
    "moments-n-memories.firebaseapp.com",

  projectId:
    "moments-n-memories",

  storageBucket:
    "moments-n-memories.appspot.com",

  messagingSenderId:
    "799556730339",

  appId:
    "1:799556730339:web:f2257a8c9bcb350d4cb4d6",
};

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);

export const storage =
  getStorage(app);

export const googleProvider =
  new GoogleAuthProvider();