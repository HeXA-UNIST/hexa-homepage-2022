import firebase from 'firebase/compat/app';
import {combineReducers} from 'redux';
import {firebaseReducer, firestoreReducer} from 'react-redux-firebase';
import { createStore } from "redux";
import { createFirestoreInstance } from "redux-firestore";


import {rrfConfig} from './firebase.js';

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };

export {rrfProps, store};

