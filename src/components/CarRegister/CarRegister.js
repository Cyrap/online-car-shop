import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useUser } from "../../config/UserProvider";
import { useFirebase } from "../../config/FirebaseContext";
import { Timestamp } from "firebase/firestore";
import { ref, uploadBytes ,getDownloadURL} from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library
import style from "./CarRegister.module.css";
import { updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
const CarRegister = () => {
  const user = useUser();
  const { db, storage } = useFirebase();
  console.log(user?.uid);
  const [newCarCompany, setNewCarCompany] = useState("");
  const [newCarModel, setNewCarModel] = useState("");
  const [newCarColor, setNewCarColor] = useState("");
  const [newCarYear, setNewCarYear] = useState(null); // Initialize as null
  const [newCarEntryYear, setNewCarEntryYear] = useState(null); // Initialize as null

  const movieCollectionRef = collection(db, "Cars");

  // file upload state
  const [fileUpload, setFileUpload] = useState(null);
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
        OwnerID: user.uid,
      };
  
      const carRef = await addDoc(movieCollectionRef, carData);
  
      const imageUUID = uuidv4();
      const imageName = `${carRef.id}_${imageUUID}`;
      const fileFolderRef = ref(storage, `carImages/${imageName}`);
  
      if (fileUpload) {
        const uploadImagePromise = uploadBytes(fileFolderRef, fileUpload)
          .then(() => getDownloadURL(fileFolderRef))
          .then((imageURL) => {
            // Update the car data with the retrieved image URL
            carData.imageURL = imageURL;
          });
  
        // Wait for both image upload and update to complete
        await Promise.all([uploadImagePromise]);
  
        // Update the car data in Firestore with the image URL
        await updateDoc(doc(db, "Cars", carRef.id), {
          imageURL: carData.imageURL,
        });
      }
  
      // Reset form fields and fileUpload state
      setNewCarCompany("");
      setNewCarModel("");
      setNewCarColor("");
      setNewCarYear(null);
      setNewCarEntryYear(null);
      setFileUpload(null);
  
      console.log("Car data and image added successfully");
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


      <button className={style.button} onClick={onSubmitCar}>Submit</button>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}></input>
      </div>
    </div>
  );
};

export default CarRegister;
