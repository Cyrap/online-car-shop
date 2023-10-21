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
    } catch(err){
        console.error(err)
    }
  };
  if(user){
   return <div>{user.displayName} login success</div>
  }else{
      return (
          <div className={styles.div}>
            <h3>Login</h3>
      <input
        className={styles.input}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        />
      <input
       className={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
      <button 
      onClick={logIn}
      className={styles.button}
      >Log in</button>
    </div>
  );
    }
};

export default SignIn;
