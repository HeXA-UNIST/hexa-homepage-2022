import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import firebaseConfig from './.env.js';

const firebase = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebase);
export const firebaseStore = getFirestore(firebase);

export default firebase;
