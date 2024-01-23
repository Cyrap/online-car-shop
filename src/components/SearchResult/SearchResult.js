import React, { useEffect, useState } from "react";
import { useFirebase } from "../../config/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import styles from "./SearchResult.module.css"
const SearchResult = () => {
    const { db } = useFirebase();
    const [searchResults, setSearchResults] = useState([]);
    const {model} = useParams();
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
    if(searchResults.length > 0){
        return (
            <div className={styles.container}>
            {searchResults.map((car, index) => (
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
    }else{
        return<div className={styles.notFound}>
            <div className={styles.notFoundText}>
         {model} : Хайлтын илэрц олдсонгүй
            </div>
        
        </div>
    }
};

export default SearchResult;
