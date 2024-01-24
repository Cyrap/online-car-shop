import React, { useState } from "react";
import { useUser } from "../../context/UserProvider";
import { signOut } from "firebase/auth";
import { useFirebase } from '../../context/FirebaseContext'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import Search from "../Search/Search";
import addDocIMg from "../../img/addDoc.png"
const Navbar = () => {
  const user = useUser();
  const { auth } = useFirebase();
  const navigate = useNavigate();
  const userPhotoURL = user?.photoURL;
  const logoPath = process.env.PUBLIC_URL + '/logov2.png';
  const [isDropdownClicked, setDropDownClicked] = useState(false);

  const toggleDropdown = () => {
    setDropDownClicked(!isDropdownClicked);
  }

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
     <button className={styles.button}>
      <Link className={styles.link} to="/">  
     < div className={styles.img}>
      <img  src={logoPath}></img>
      </div>
      </Link>
      </button>

      <Search/>


    <div className={styles.userMenu}>
           <div className={styles.img} onClick={toggleDropdown}>
           <button className={styles.img} onClick={toggleDropdown}><i class="fa-solid fa-user"></i></button>
       {isDropdownClicked && (
                <div className={styles.dropdownContent}>
                <button className={styles.button}><Link className={styles.link} to="/signUp">Бүртгүүлэх</Link></button>
             <button className={styles.button}><Link className={styles.link} to="/signIn">Нэвтрэх</Link></button>
              </div>
            )}
          </div>
        </div>
    </div>

  }else{
    return (
      <div className={styles.container}>
        <button className={styles.button}>
          <Link className={styles.link} to="/">
            <div className={styles.img}>
              <img src={logoPath} alt=""></img>
            </div>
          </Link>
        </button>

        <Search/>
        <div className={styles.userMenu}>
          <button className={styles.button}><Link className={styles.link} to="/myPosts"><div className={styles.img}><i class="fa-regular fa-folder"></i></div></Link></button>
          <button className={styles.button}><Link className={styles.link} to="/register"><div className={styles.img}><i className="fas fa-pencil-alt"></i></div></Link></button>
          <div className={styles.img} onClick={toggleDropdown}>
            <img src={userPhotoURL} alt="" className={styles.img}></img>
            {isDropdownClicked && (
              <div className={styles.dropdownContent} onClick={logout}>
                <button className={styles.logoutBtn}>Гарах <i class="fa-solid fa-right-from-bracket"></i></button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
 
};

export default Navbar;
