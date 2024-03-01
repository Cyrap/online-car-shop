import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SLT.module.css"

const SLT = ()=>{
    const navigate = useNavigate();
    const login = (e) =>{
        if(e == "L"){
            navigate("/signIn");
        }else{
            navigate("signUp");
        }
    }
    return <div className={styles.sltcontainer}>
        <button onClick={()=>login("L")}>Sign In</button>
        <button onClick={()=>login("S")}>Sign up</button>
    </div>
}

export default SLT;