import firebase from 'firebase/compat/app'
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    // Put FirebaseConfig.
}

const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
};


firebase.initializeApp(firebaseConfig);

export {rrfConfig};
