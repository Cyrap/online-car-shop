import React, { useState } from "react";
import { useUser } from "../../config/UserProvider";
import {collection, doc, getDocs, query, where } from "firebase/firestore";
import { getDoc} from "firebase/firestore";
import { useFirebase } from "../../config/FirebaseContext";
const List = () =>{
    // const user = useUser();
    const {db} = useFirebase();
    const [modelData, setModelData] = useState([]);
    const dataRef = collection(db,"Cars");


    const filteredModes = async () =>{
            try{
            const data = await getDocs(dataRef);
            const filteredData = data.docs.map((doc)=>({...doc.data()}));
            setModelData(filteredData);
            console.log(filteredData);
            }catch(err){
                console.log(err);
            }
    };

    filteredModes();
    return(
        <>
        <div>
            <div>
                here is list table
                {modelData.map((model)=>{model})}
            </div>
        </div>
        </>
    )
}
export default List;