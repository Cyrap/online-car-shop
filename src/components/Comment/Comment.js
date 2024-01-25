import { addDoc, collection } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";
import { useUser } from "../../context/UserProvider";
import styles from "./Comment.module.css"
import { useState } from "react";

const Comment = ()=>{
    const {db} = useFirebase();
    const user = useUser();
    const [comment, setComment]= useState("");
    const newDate = new Date();

    const PostComment = async () =>{
        try{
            const newPost = {
                date: newDate,
                message: comment,
                name : user.uid ,
                rate : "component not ready yet"
            }
            const addDocRef = collection(db,"Comments");
            await addDoc(addDocRef,newPost);
        }catch(err){
            console.log(err);
        }
    }

    return  <div className={styles.container}>
        <textarea placeholder="Сэтгэгдэл үлдээх" onChange={(e)=>setComment(e.target.value)}></textarea>
        <button onClick={PostComment}><i class="fa-solid fa-paper-plane fa-2x"></i></button>
    </div>
 }

export default Comment;