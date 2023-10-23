import React from "react";
import { useUser } from "../../config/UserProvider";
import { signOut } from "firebase/auth";
import { useFirebase} from '../../config/FirebaseContext'
import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'
const Navbar = () => {
  const user = useUser();
  const {auth} = useFirebase()
  

  const userPhotoURL = user?.photoURL;
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  if (!user) {
    return <div className={styles.container}>
    <button className={styles.button}><Link className={styles.link} to="/">Home</Link></button>
    <button className={styles.button}><Link className={styles.link} to="/signIn">Sign In</Link></button>
    </div>

  }else{
      return (
          <div className={styles.container}>
            <button className={styles.button}><Link className={styles.link} to="/">Home</Link></button>
      {/* <p>Hello, {user.displayName}!</p> */}
      <div className={styles.userMenu}>
      <button className={styles.button}><Link className={styles.link} to="/register">Register a car</Link></button>
      <div className={styles.img}  onClick={logout}>
      <img  src={userPhotoURL}></img>
      </div>
      {/* <button onClick={logout}>Log out</button> */}
      </div>
    </div>
  );
}
};
export default Navbar;
