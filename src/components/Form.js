// import { useState } from "react";
// import { db } from "../firebase/Firebase_config";
// import { auth } from "../firebase/Firebase_config";
// import {
//   GoogleAuthProvider,
//   getAuth,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signOut,
// } from "firebase/auth";
// import {
//   getFirestore,
//   query,
//   getDocs,
//   collection,
//   where,
//   addDoc,
// } from "firebase/firestore";

// export const Form = () => {
//   const googleProvider = new GoogleAuthProvider();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   //   const user = (e) => {
//   //     e.preventDefault();
//   //     console.log(email, password);
//   //   };
//   const signInWithGoogle = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await signInWithPopup(auth, googleProvider);
//       const user = res.user;
//       const q = query(collection(db, "users"), where("uid", "==", user.uid));
//       const docs = await getDocs(q);
//       if (docs.docs.length === 0) {
//         await addDoc(collection(db, "users"), {
//           uid: user.uid,
//           name: user.displayName,
//           authProvider: "google",
//           email: user.email,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };
//   const loginInWithEmailAndPassword = async (auth, email, password, e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };
//   const registerWithEmailAndPassword = async (name, email, password, e) => {
//     e.preventDefault();
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       const user = res.user;
//       await addDoc(collection(db, "users"), {
//         uid: user.id,
//         name,
//         authProvider: "local",
//         email,
//       });
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };
//   const sendPasswordReset =async (email)=>{
//     try{
//         await sendPasswordResetEmail(auth,email);
//         alert("Password reset link sent")
//     }
//     catch(err){
//         console.error(err)
//         alert(err.message)
//     }
//   }
// const logout =()=>{
//     signOut(auth)
// }
//   return (
//     <div className="container w-1/2 m-auto">
//       <form>
//         <div className="mb-6">
//           <label
//             // htmFor="email"
//             className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//           >
//             Your email
//           </label>
//           <input
//             value={email}
//             onChange={(e) => setEmail(console.log(e.target.value))}
//             type="email"
//             id="email"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="name@flowbite.com"
//             required=""
//           />
//         </div>
//         <div className="mb-6">
//           <label
//             // htmFor="password"
//             className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//           >
//             Your password
//           </label>
//           <input
//             value={password}
//             onChange={(e) => setPassword(console.log(e.target.value))}
//             type="password"
//             id="password"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             required=""
//           />
//         </div>
//         <div className="flex items-start mb-6">
//           <div className="flex items-center h-5">
//             <input
//               id="remember"
//               type="checkbox"
//               value=""
//               className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
//               required=""
//             />
//           </div>
//           <label
//             // htmFor="remember"
//             className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//           >
//             Remember me
//           </label>
//         </div>
//         <button
//           onSubmit={registerWithEmailAndPassword}
//           type="submit"
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { Register } from "./Register";
import { Dashboard } from "./Dashboard";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  db,
  signInWithGoogle,
  loginInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithEmailAndPassword,
  logout,
} from "../firebase/Firebase_config";
import { useAuthState } from "react-firebase-hooks/auth";
// import "./Login.css";
export const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
};
