import React, { useState } from "react";
import { useUser } from "../../config/UserProvider";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useFirebase } from "../../config/FirebaseContext";
import styles from './SignUp.module.css'
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const user = useUser();
  const {auth} = useFirebase();
  const {googleProvider} = useFirebase();
  const navigate = useNavigate();
  const emailRegex = /^[a-z-A-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^[a-zA-Z0-9]z{8,}$/;

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");



  const signIn = async () => {
    try {
      if(emailRegex.test(email) && passwordRegex.test(password)){
        await createUserWithEmailAndPassword(auth,email, password);
        navigate("/");
      }
      else{
        alert("invalid e mail or password");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  console.log(user?.uid);

  if(user){
    return <></>
  }else{

    return (
      <div>
        <div className={styles.container}>
        <div className={styles.div}>
          <h3>Бүртгүүлэх</h3>
          <input id="email" className={styles.input} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input id="password" className={styles.input}
            placeholder="Нууц үг"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
          <button className={styles.button} onClick={signIn}>Бүртгүүлэх</button>
          <button className={styles.button} onClick={signInWithGoogle}>Google account</button>
        </div>
        </div>
    </div>
  );
}
};

export default Auth;
