import React from "react";
import CarData from "../CarData/CarData";
import styles from "./HomePage.module.css";
import image1 from "../../img/img1.png"
import image2 from "../../img/img2.png"
import image3 from "../../img/img3.png"
import { useUser } from "../../config/UserProvider";
const HomePage = () => {
  const user = useUser();

  return (
    <div className={styles.wrapper}>
      {!user &&  
    <div className={styles.header}>
        <img src={image3} className={styles.image3}/>
        <img src={image2} className={styles.image2}/>
        <img src={image1} className={styles.image1}/>
        <h3 className={styles.title}>Тавтай морил</h3>
    </div>
    }

    <div className={styles.container}>
        <CarData/>
    </div>
    </div>
  );
};

export default HomePage;
