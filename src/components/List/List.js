import React, { useState, useEffect } from "react";
import { useFirebase } from "../../config/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom"; // Import Link
import styles from "./List.module.css";

const List = () => {
    const { db } = useFirebase();
    const [modelData, setModelData] = useState([]);
    const dataRef = collection(db, "Cars");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDocs(dataRef);
                const filteredData = data.docs.map((doc) => ({ ...doc.data() }));
                setModelData(filteredData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <div className={styles.container}>
                <div className={styles.child}>
                    {modelData.map((model, index) => (
                        <Link
                            to={`/search-results/${model.model}`} 
                            key={index}
                            style={{
                                height: "110%"
                            }}
                            className={styles.button}
                        >
                            {model.model}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default List;
