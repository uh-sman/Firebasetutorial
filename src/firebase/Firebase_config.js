import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
const googleProvider = new GoogleAuthProvider();
const firebaseConfig = {
  apiKey: "AIzaSyBApw8PtpZTd2f4SsFZjUX_bI_SSTQ8VIo",
  authDomain: "fir-tutorial-9992f.firebaseapp.com",
  projectId: "fir-tutorial-9992f",
  storageBucket: "fir-tutorial-9992f.appspot.com",
  messagingSenderId: "62270232761",
  appId: "1:62270232761:web:8b170645c152928d916368",
  measurementId: "G-Y5Q9QVZG3R",
};
const signInWithGoogle = async (e) => {
  e.preventDefault();
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const loginInWithEmailAndPassword = async (auth, email, password, e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  //   e.preventDefault();
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // console.log(user.uid);
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {
  auth,
  db,
  signInWithGoogle,
  loginInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
