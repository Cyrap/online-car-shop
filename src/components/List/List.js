import React, { useState, useEffect } from "react";
import { useFirebase } from "../../config/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import styles from "./List.module.css";

const List = () => {
    const { db } = useFirebase();
    const [modelData, setModelData] = useState([]);
    const dataRef = collection(db, "Cars");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDocs(dataRef);
                const carModels = data.docs.map((doc) => doc.data().model);
                const modelCounts = countModels(carModels);
                setModelData(modelCounts);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const countModels = (models) => {
        const modelCounts = {};
        models.forEach((model) => {
            modelCounts[model] = (modelCounts[model] || 0) + 1;
        });
        return Object.entries(modelCounts).map(([model, count]) => ({ model, count }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.child}>
                {modelData.map((item, index) => (
                    <Link
                        to={`/search-results/${item.model}`}
                        key={index}
                        style={{
                            height: "110%",
                        }}
                        className={styles.button}
                    >
                        {`${item.model} [${item.count}]`}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default List;
