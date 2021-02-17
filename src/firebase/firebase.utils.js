import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCdX-e8qgq0p1FYGGJAXdR9NsF7JdqXqnc",
    authDomain: "crwn-db-22d54.firebaseapp.com",
    projectId: "crwn-db-22d54",
    storageBucket: "crwn-db-22d54.appspot.com",
    messagingSenderId: "142016819224",
    appId: "1:142016819224:web:d92dc471c1e233a1e9936d",
    measurementId: "G-GCP1F0RB35"
};

try {
    firebase.initializeApp(config)
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

export const auth = firebase.auth();
export const firesotre = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;