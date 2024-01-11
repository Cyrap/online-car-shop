import react, { useEffect } from "react"
import { useState } from "react";
import {useUser} from "../../config/UserProvider"
import {collection, getDocs, query, where ,deleteDoc, doc} from "firebase/firestore";
import { useFirebase } from "../../config/FirebaseContext";
import styles from "./MyPosts.module.css"
const MyPosts = () =>{
    const user = useUser();
    const userId = user?.uid;
    const [postList, setPostList] = useState();
    const {db} = useFirebase();
    const postCollectionRef = collection(db,"Cars");



    useEffect(()=>{
        const getPostList = async () =>{
            try{
                const q = query(postCollectionRef, where("ownerID", "==",userId));
                const data = await getDocs(q);
                const filteredData = data.docs.map((doc) =>({
                    ...doc.data(),
                    id: doc.id,
                }))
                setPostList(filteredData);
                console.log(filteredData)
            }catch(err){
                alert(err)
            }
        }
        if(userId){
            getPostList();
        }
    },[userId])


    const deletePost = async (postId)=>{
        try{
            const deleteRef = doc(db,"Cars",postId);
            await deleteDoc(deleteRef);
            console.log("successfully deleted")
        }catch(err){
            alert("error:", err);
        }
    }


   return (
  <div className={styles.container}>
    {postList?.map((car, index) => (
      <div key={index} className={styles.div}>
        <div className={styles.img}>
          <img loading="lazy" src={car.imageURL} alt="" />
        </div>
        <p>Model: {car.model}</p>
        <p>Company: {car.company}</p>
        <p>Color: {car.color}</p>
        <p>
          Entry Year: {car.entryYear?.toDate().toLocaleDateString() || "N/A"}
        </p>
        <p>
          Made Year: {car.madeYear?.toDate().toLocaleDateString() || "N/A"}
        </p>
        <button onClick={() => deletePost(car.id)}>
          deleteDoc
        </button>
      </div>
    ))}
  </div>
);

}

export default MyPosts;