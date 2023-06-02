// Firebase auth service 
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase_app from "../firebase"
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

async function login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
}

async function logout() {
    return await auth.signOut();
}

async function register(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        console.log(userCredential);
        // Save the user to firebase database
        const user = userCredential.user;

        setDoc(doc(db, "users", user.uid), {
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        });
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });


}

export { login, logout, register };

