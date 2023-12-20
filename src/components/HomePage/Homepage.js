import React from "react";
import CarData from "../CarData/CarData";
import List from "../List/List";
import styles from "./HomePage.module.css"
const HomePage = ()=>{
    return <div className={styles.container}>
        <List/>
        <CarData/>
    </div>
}
export default HomePage;