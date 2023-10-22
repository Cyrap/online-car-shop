import React, { useEffect, useState } from "react";
import { useFirebase } from "../../config/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";

const CarData = () => {
  const { db } = useFirebase();
  const [carList, setCarData] = useState([]);

  const carCollectionRef = collection(db, "Cars");

  const getCarList = async () => {
    try {
      const data = await getDocs(carCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCarData(filteredData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCarList();
  }, []);

  return (
    <div>
      {carList.map((car, index) => (
        <div key={index}>
          <p>Model: {car.model}</p>
          <p>Company: {car.company}</p>
          <img src={car.imageURL} alt="Car Image" />
          _____________________________
        </div>
      ))}
    </div>
  );
}

export default CarData;
