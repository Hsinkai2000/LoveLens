// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    getDocs,
    writeBatch,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwWVxIZwlqyLVRN9hZi1Lv6AqiyFrHTtw",
    authDomain: "lovelens-535bc.firebaseapp.com",
    databaseURL:
      "https://lovelens-535bc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lovelens-535bc",
    storageBucket: "lovelens-535bc.appspot.com",
    messagingSenderId: "656169376737",
    appId: "1:656169376737:web:efa1d46b9ad3e77b3c10a0",
    measurementId: "G-ZSHVYCEXL1",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth(app);

export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
};

export const signInWithGoogleRedirect = () => {
    return signInWithRedirect(auth, provider);
};

export const db = getFirestore();
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userAuth);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log(error);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        return user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    ;
};

export const signOutUser = async () => await signOut(auth).then(() => {
    // Sign-out successful.
    console.log("User signed out");
  }).catch((error) => {
    // An error happened.
  });

export const onAuthStateChangedListener = () => {
    const {user} = onAuthStateChanged(auth, (user) => {
        if (user){
            return user;
        }
    });
    return user;
    
};
