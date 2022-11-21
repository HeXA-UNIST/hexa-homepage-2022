import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import firebaseConfig from './.env.js';



const firebase = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebase);
export const firebaseStore = getFirestore(firebase);
export const firebaseStorage = getStorage(firebase);

export default firebase;


