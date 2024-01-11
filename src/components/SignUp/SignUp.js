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
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth,email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      signInWithPopup(auth, googleProvider);
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
          <input className={styles.input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className={styles.input}
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
