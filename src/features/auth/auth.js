import { firebaseAuth, firebase } from '../../app/firebase';

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth';

import { setIsLoggedIn, setUser } from './login_reducer';
import { loadPersonalDataFirebase, postPersonalDataFirebase } from '../personal/personal';

// Home page에서 registerAuthStateChangedObserver 실행해줘야 함.
export const registerAuthStateChangedObserver = (dispatch) => {
    firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            dispatch(setIsLoggedIn(true));
            dispatch(setUser(user));
        } else {
            dispatch(setIsLoggedIn(false));
        }
    }
    );
}

export const loginWithEmail = async (email, password) => {
    try {
        let userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        // If User PersonalData doesn't exist, post initial PersonalData
        if ((await loadPersonalDataFirebase(userCredential.user.uid)) == null) {
            await postPersonalDataFirebase(userCredential.user.uid, { email: userCredential.user.email });
        }
        return userCredential;
    } catch (e) {
        return e.message.replace("Firebase: Error ", "");
    }
};

export const registerWithEmail = async (email, password) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        await postPersonalDataFirebase(userCredential.user.uid, { email: userCredential.user.email });
        return userCredential;
    } catch (e) {
        return e.message.replace("Firebase: Error ", "");
    }
};

export const logout = async () => {
    await signOut(firebaseAuth);
}
export const registerWithGoogle = async () => {
    var provider = new GoogleAuthProvider()
    
    const data = await signInWithPopup(firebaseAuth, provider);
    //console.log(data);
}
export const registerWithGithub = async () => {
    var provider = new GithubAuthProvider();
    const data = await signInWithPopup(firebaseAuth, provider);
}