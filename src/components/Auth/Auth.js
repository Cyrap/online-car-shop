import React, { useState } from "react";
import { useUser } from "../../config/UserProvider";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useFirebase } from "../../config/FirebaseContext";
import styles from './Auth.module.css'
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const user = useUser();
  const {auth} = useFirebase();
  const {googleProvider} = useFirebase();
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth,email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(user?.uid);

  return (
    <div>
      {user ? (
        <div className={styles.container}>
          <p>Hello, {user.displayName}!</p>
          <button className={styles.button} onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className={styles.container}>
        <div className={styles.div}>
          <h3>Sign up</h3>
          <input className={styles.input} placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
          <input className={styles.input}
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
          <button className={styles.button} onClick={signIn}>Sign up</button>
          <button className={styles.button} onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
