import React, { useState } from "react";
import { useUser } from "../../config/UserProvider";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useFirebase } from "../../config/FirebaseContext";
import styles from "./SignIn.module.css"
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {auth} = useFirebase();
  const user = useUser();
  const {googleProvider} = useFirebase();
  const navigate = useNavigate();
  const logIn = async () => {
    try{
        await signInWithEmailAndPassword(auth,username,password);
        navigate("/")
        alert("login successfully");
    } catch(err){
        alert(err);
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

  if(user){
   return <div>{user.displayName} Амжилттай нэвтэрлээ</div>
  }else{
      return (
        <div>
        <div className={styles.container}>
        <div className={styles.div}>
          <h3>Нэвтрэх</h3>
          <input className={styles.input} placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
          <input className={styles.input}
            placeholder="Нууц үг"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
          <button className={styles.button} onClick={logIn}>Нэвтрэх</button>
          <button className={styles.button} onClick={signInWithGoogle}>Google account</button>
        </div>
        </div>
    </div>
  );
    }
};

export default SignIn;