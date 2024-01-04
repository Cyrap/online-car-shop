import React from "react";
import { useUser } from "../../config/UserProvider";
import { signOut } from "firebase/auth";
import { useFirebase} from '../../config/FirebaseContext'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Navbar.module.css'
const Navbar = () => {
  const user = useUser();
  const {auth} = useFirebase();
  const navigate = useNavigate();
  const userPhotoURL = user?.photoURL;

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("./");
    } catch (err) {
      console.error(err);
    }
  };
  if (!user) {
    return <div className={styles.container}>
    <button className={styles.button}><Link className={styles.link} to="/">Home</Link></button>
    <div>
    <button className={styles.button}><Link className={styles.link} to="/signUp">Бүртгүүлэх</Link></button>
    <button className={styles.button}><Link className={styles.link} to="/signIn">Нэвтрэх</Link></button>
    </div>
    </div>

  }else{
      return (
      <div className={styles.container}>
      <button className={styles.button}><Link className={styles.link} to="/">Home</Link></button>
      <div className={styles.userMenu}>
      <button className={styles.button}><Link className={styles.link} to="/register">Register a car</Link></button>
      <div className={styles.img}  onClick={logout}>
      <img  src={userPhotoURL}></img>
      </div>
      </div>
      </div>
  );
}
};
export default Navbar;
