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

// Function gets called in app.js when onAuthStateChanged gets called
export const createUserProfileDocument = async (userAuth, additonalData) => {
    // Check if userAuth exists otherwise exit function
    if (!userAuth) return;

    // Get userAuth id and snapshot by id
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    // If snapshot does not exist (meaning that the user does not exist)
    // create user in the database users collection with the name email 
    // and other properties collected from the userAuth object
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additonalData
            })
        } catch (err) {
            console.log('error creating user', err.message);
        }
    }

    // return userRef for later use in the project 
    return userRef;
}

try {
    firebase.initializeApp(config)
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;