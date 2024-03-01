import React from "react";
import { collection } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";
import { useUser } from "../../context/UserProvider";
import { addDoc } from "firebase/firestore";
// import s from "./LikeBtn.module.css"
const LikeBtn = (e) =>{
    const postId = e.e;
    console.log(postId)
    const user = useUser();
    const {db} = useFirebase();
    const LikeRef = collection(db,"InterestedCars");
    const userId = user?.uid;

    const postLike = {
        CarId: postId,
        UserId: userId,
    }
    

    const Like = async ()=>{
        try{
            await addDoc(LikeRef, postLike);
            alert("function called")
        }catch(err){
            alert(err);
        }
    }


    return (
    <i onClick={Like} class="fa-regular fa-heart fa-2x"></i>
    )
}

export default LikeBtn;