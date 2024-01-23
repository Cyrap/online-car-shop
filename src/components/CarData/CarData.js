import React, { useEffect, useState } from "react";
import { useFirebase } from "../../config/FirebaseContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import styles from './CarData.module.css'
import LikeBtn from "../LikeBtn/LikeBtn";
import useNavigation from "../Buttons/Navigation/useNavigation";

const CarData = () => {
  const { db } = useFirebase();
  const [carList, setCarData] = useState([]);
  const carCollectionRef = collection(db, "Cars");
  const {handleNavigation} = useNavigation();
  useEffect(() => {
    const unsubscribe = onSnapshot(carCollectionRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCarData(data);
    });
    return () => unsubscribe();
  }, []);




  

  return (
    <div className={styles.container}>
      {carList.map((car, index) => (
        <div key={index} className={styles.div} onClick={()=>handleNavigation(car)}>
          <div className={styles.img}>
          <img loading="lazy" src={car.imageURL} alt=""/>
          </div>
          <p>Загвар: {car.model}</p>
          <p>Үилдвэр: {car.company}</p>
          <LikeBtn e={car.id}/>
        </div>
      ))}
    </div>
  );
}

export default CarData;