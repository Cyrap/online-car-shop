import React, { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../config/UserProvider";
import { useFirebase } from "../../config/FirebaseContext";
import { Timestamp } from "firebase/firestore";
import styles from './CarRegister.module.css';

const CarRegister = () => {
  const user = useUser();
  const { db, storage } = useFirebase();
  const [newCarCompany, setNewCarCompany] = useState("");
  const [newCarModel, setNewCarModel] = useState("");
  const [newCarColor, setNewCarColor] = useState("#ff0000"); // Default color value
  const [newCarYear, setNewCarYear] = useState("");
  const [newCarEntryYear, setNewCarEntryYear] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const handleSelectedChange = (e) => {
    setNewCarModel(e.target.value);
  };

  const onSubmitCar = async () => {
    try {
      const madeYearTimestamp = Timestamp.fromDate(new Date(newCarYear));
      const entryYearTimestamp = Timestamp.fromDate(new Date(newCarEntryYear));

      const carData = {
        company: newCarCompany,
        model: newCarModel,
        color: newCarColor,
        madeYear: madeYearTimestamp,
        entryYear: entryYearTimestamp,
        ownerID: user.uid, // Use camelCase for consistency
      };

      const carRef = await addDoc(collection(db, "Cars"), carData);

      if (fileUpload) {
        const imageUUID = uuidv4();
        const imageName = `${carRef.id}_${imageUUID}`;
        const fileFolderRef = ref(storage, `carImages/${imageName}`);

        await uploadBytes(fileFolderRef, fileUpload);
        const imageURL = await getDownloadURL(fileFolderRef);

        // Update the document with the imageURL
        await updateDoc(doc(db, "Cars", carRef.id), { imageURL });
      }

      // Clear input fields and fileUpload state after submission
      setNewCarCompany("");
      setNewCarModel("");
      setNewCarColor("#ff0000");
      setNewCarYear("");
      setNewCarEntryYear("");
      setFileUpload(null);

      alert("Car data and image added successfully");
    } catch (err) {
      console.error(err);
      alert("Error adding car: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3>Авто машин бүртгэх</h3>
        <input className={styles.input} placeholder="Company" type="text" value={newCarCompany} onChange={(e) => setNewCarCompany(e.target.value)} />
        <select className={styles.input} placeholder="Model" value={newCarModel} onChange={handleSelectedChange}>
          <option value={"Toyota"}>Toyota</option>
          <option value={"BMW"}>BMW</option>
          <option value={"Benz"}>Benz</option>
        </select>
        <input type="color" name="favcolor" value={newCarColor} onChange={(e) => setNewCarColor(e.target.value)} />
        <input className={styles.input} placeholder="Made Year" type="date" value={newCarYear} onChange={(e) => setNewCarYear(e.target.value)} />
        <input className={styles.input} placeholder="Date of Entry to Mongolia" type="date" value={newCarEntryYear} onChange={(e) => setNewCarEntryYear(e.target.value)} />
        <button className={styles.button} onClick={onSubmitCar}>Submit</button>
        <div>
          <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}></input>
        </div>
      </div>
    </div>
  );
};

export default CarRegister;
