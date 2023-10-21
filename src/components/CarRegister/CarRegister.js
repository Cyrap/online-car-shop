import React, { useState } from "react";
import { collection, addDoc } from 'firebase/firestore';
import style from './CarRegister.module.css';
import { useUser } from "../../config/UserProvider";
import { useFirebase } from "../../config/FirebaseContext";
import { Timestamp } from 'firebase/firestore'; // Import Timestamp

const CarRegister = () => {
  const user = useUser();
  const { db } = useFirebase();
  console.log(user?.uid);
  const [newCarCompany, setNewCarCompany] = useState("");
  const [newCarModel, setNewCarModel] = useState("");
  const [newCarColor, setNewCarColor] = useState("");
  const [newCarYear, setNewCarYear] = useState(null); // Initialize as null
  const [newCarEntryYear, setNewCarEntryYear] = useState(null); // Initialize as null

  const movieCollectionRef = collection(db, "Cars");

  const onSubmitCar = async () => {
    try {
      const madeYearTimestamp = Timestamp.fromDate(new Date(newCarYear)); // Convert to Timestamp
      const entryYearTimestamp = Timestamp.fromDate(new Date(newCarEntryYear)); // Convert to Timestamp

      await addDoc(movieCollectionRef, {
        company: newCarCompany,
        model: newCarModel,
        color: newCarColor,
        madeYear: madeYearTimestamp,
        entryYear: entryYearTimestamp,
        OwnerID: user.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={style.form}>
      <input placeholder="Company" type="text" onChange={(e) => setNewCarCompany(e.target.value)} />
      <input placeholder="Model" type="text" onChange={(e) => setNewCarModel(e.target.value)} />
      <input placeholder="Color" type="test" onChange={(e) => setNewCarColor(e.target.value)} />
      <input placeholder="Made Year" type="date" onChange={(e) => setNewCarYear(e.target.value)} />
      <input placeholder="Date of Entry to Mongolia" type="date" onChange={(e) => setNewCarEntryYear(e.target.value)} />
      <button className={style.button} onClick={onSubmitCar}>Submit</button>
    </div>
  );
};

export default CarRegister;
