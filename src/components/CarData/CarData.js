import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/FirebaseContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import styles from './CarData.module.css'
import PostContainer from "../PostContainer/PostContainer";

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
      setCarData(data);
    });
    return () => unsubscribe();
  }, []);
  return (
    
    <div className={styles.container}>
      {carList.map((car, index) => (
        <PostContainer {...car} key={index}/>
      ))}
    </div>
  );
}

export default CarData;