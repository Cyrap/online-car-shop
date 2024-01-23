import React, { useState, useEffect } from "react";
import { useFirebase } from "../../context/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";
const SideBar = () => {
    const { db } = useFirebase();
    const [modelData, setModelData] = useState([]);
    const dataRef = collection(db, "Cars");
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleButton = () =>{
        setSidebarVisible(!isSidebarVisible);
    }

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
    <div className={styles.parent}>
      <div className={styles.wrapper} style={{width:isSidebarVisible ? "100vw" : 0}}>
     
       {isSidebarVisible && (
        <>
          <div className={styles.closeModal} onClick={(e) => { e.stopPropagation(); toggleButton(); }}></div>

           <div className={styles.container}>
                 <div className={styles.child}>
             {modelData.map((item, index) => (
                 <Link
                 onClick={()=>{toggleButton()}}
                 to={`/search-results/${item.model}`}
                 key={index}
                 className={styles.button}
                 >
                   <span className={styles.item}>
                       {`${item.model}`}<span className={styles.counter}>{item.count}</span>
                    </span>
                    
                 </Link>
             ))}
         </div>
     </div>
             </>
       )}
       {!isSidebarVisible &&  <div className={styles.toggleButton}>
           <div className={styles.buttonContainer} onClick={()=>{toggleButton()}}>
               <button className={styles.primeButton} onClick={()=>{toggleButton()}}> {isSidebarVisible ? "<" : ">"}</button>
            </div>
       </div>}
    </div>
       </div>
    );
};

export default SideBar;
