import React, { useEffect, useState } from "react";
// import {Login} from './Login'
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  //   registerWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/Firebase_config";
// import "./Register.css";
export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = (e) => {
    console.log(e);
    e.preventDefault();

    if (!name) alert("Please enter name");
    console.log(name, password, email);
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <form onSubmit={register} className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Register" />
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </form>
  );
};
export default Register;
