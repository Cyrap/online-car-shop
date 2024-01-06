import React, { useEffect, useState } from "react";
import { useFirebase } from "../../config/FirebaseContext";
import { collection, onSnapshot } from "firebase/firestore";
import styles from './CarData.module.css'
const CarData = () => {
  const { db } = useFirebase();
  const [carList, setCarData] = useState([]);
  const carCollectionRef = collection(db, "Cars");

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


  return (
    <div className={styles.container}>
      {carList.map((car, index) => (
        <div key={index} className={styles.div}>
          <div className={styles.img}>
          <img loading="lazy" src={car.imageURL} alt=""/>
          </div>
          <p>Model: {car.model}</p>
          <p>Company: {car.company}</p>
        </div>
      ))}
    </div>
  );
}

export default CarData;