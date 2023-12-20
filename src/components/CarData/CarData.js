import React, { useEffect, useState } from "react";
import { useFirebase } from "../../config/FirebaseContext";
import { collection, deleteDoc, onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import styles from './CarData.module.css'
const CarData = () => {
  const { db } = useFirebase();
  const [carList, setCarData] = useState([]);
  const deleteCar = async (id)=>{
    const carDoc = doc(db,"Cars",id);
    await deleteDoc(carDoc);
  }
  const carCollectionRef = collection(db, "Cars");

  useEffect(() => {
    const unsubscribe = onSnapshot(carCollectionRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCarData(data);
      data.map((car)=>{
        console.log(car.color);
      });
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className={styles.container}>
      {carList.map((car, index) => (
        <div key={index} className={styles.div} style={{background: car.color}}>
          <p>Model: {car.model}</p>
          <p>Company: {car.company}</p>
          <div className={styles.img}>
          <img loading="lazy" src={car.imageURL} alt="Car Image" />
          </div>
          <button className={styles.button}onClick={() => deleteCar(car.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default CarData;