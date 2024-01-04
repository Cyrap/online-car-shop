import React, { useState } from "react";
import { useUser } from "../../config/UserProvider";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useFirebase } from "../../config/FirebaseContext";
import styles from "./SignIn.module.css"
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {auth} = useFirebase();
  const user = useUser();
  const logIn = async () => {
    try{
        await signInWithEmailAndPassword(auth,username,password);
        alert("login successfully");
    } catch(err){
        alert(err);
    }
  };
  if(user){
   return <div>{user.displayName} Амжилттай нэвтэрлээ</div>
  }else{
      return (
          <div className={styles.container}>
            <div className={styles.form}> 
            <h3 className={styles.header}>Нэвтрэх</h3>
      <input
        className={styles.input}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Нэвтрэх нэр"
        />
      <input
       className={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Нууц үг"
        />
      <button 
      onClick={logIn}
      className={styles.button}
      >Нэвтрэх</button>
        </div>
    </div>
  );
    }
};

export default SignIn;