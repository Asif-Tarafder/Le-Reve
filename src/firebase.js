import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZvKt5_VvwquR0HMHsJQOpLzgsqdpDQXo",
  authDomain: "coin-check-57543.firebaseapp.com",
  projectId: "coin-check-57543",
  storageBucket: "coin-check-57543.appspot.com",
  messagingSenderId: "160316745106",
  appId: "1:160316745106:web:0412d828b7ba1e3cad4d4b",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const db = getFirestore();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signOutUser = () => signOut(auth);

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userDocRef;
};
