import React, { useEffect, useState } from "react";
import { useFirebase } from "../../config/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import List from "../List/List";
import styles from "./SearchResult.module.css"
const SearchResult = () => {
    const { db } = useFirebase();
    const [searchResults, setSearchResults] = useState([]);
    const { model } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataRef = collection(db, "Cars");
                const queryRef = query(dataRef, where("model", "==", model));
                const data = await getDocs(queryRef);
                const filteredData = data.docs.map((doc) => ({ ...doc.data() }));
                setSearchResults(filteredData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [model, db]);

    return (
        <>
        <div style={{display:"flex",flexDirection:"row"}}>
        <List/>
        <div className={styles.container}>
        {searchResults.map((car, index) => (
            <div key={index} className={styles.div} style={{background: car.color}}>
            <p>Model: {car.model}</p>
            <p>Company: {car.company}</p>
            <div className={styles.img}>
            <img src={car.imageURL} alt="Car Image" />
            </div>
            <button className={styles.button}onClick={() => deleteCar(car.id)}>delete</button>
          </div>
        ))}
      </div>
        </div>
        </>
    );
};

export default SearchResult;
