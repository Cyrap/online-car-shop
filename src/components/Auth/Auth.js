import React, { useState } from "react";
import { useUser } from "../../config/UserProvider";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useFirebase } from "../../config/FirebaseContext";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const user = useUser(); // Access the current user from the UserContext
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
  console.log(user)

  return (
    <div>
      {user ? (
        <div>
          <p>Hello, {user.displayName}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
          <input
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signIn}>Sign In</button>
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
