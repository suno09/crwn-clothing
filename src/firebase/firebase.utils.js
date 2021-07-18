import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAc0XyX6R4u1D1P_WUA-qsBwVY8lls-jtw",
  authDomain: "crwn-db-d5c92.firebaseapp.com",
  projectId: "crwn-db-d5c92",
  storageBucket: "crwn-db-d5c92.appspot.com",
  messagingSenderId: "29411029071",
  appId: "1:29411029071:web:4489122bba5d9c1ff57a3a",
  measurementId: "G-KKH9FRCTBK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const createUserProfileDocument = async(userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  // console.log(firestore.doc('users/1258defr45f'))

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  
  if (!snapshot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;

}

export default firebase;