import React, { useEffect, useState } from "react";
import { useFirebase } from "../../config/FirebaseContext";
import { collection, onSnapshot } from "firebase/firestore";
import styles from './CarData.module.css'
import Popup from "../Popup/Popup";
import { useNavigate } from "react-router-dom";
const CarData = () => {
  const { db } = useFirebase();
  const [carList, setCarData] = useState([]);
  const carCollectionRef = collection(db, "Cars");
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onSnapshot(carCollectionRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("fetching function called")
      setCarData(data);

    });

    return () => unsubscribe();
  }, []);


  const Popup = (e) =>{
    navigate(`/Popup/${e.id}`);    
    console.log(e)
  }



  return (
    <div className={styles.container}>
      {carList.map((car, index) => (
        <div key={index} className={styles.div} onClick={()=>Popup(car)}>
          <div className={styles.img}>
          <img loading="lazy" src={car.imageURL} alt=""/>
          </div>
          <p>Загвар: {car.model}</p>
          <p>Үилдвэр: {car.company}</p>
        </div>
      ))}
    </div>
  );
}

export default CarData;