import react, { useEffect } from "react"
import { useState } from "react";
import {useUser} from "../../config/UserProvider"
import {collection, getDocs, query, where ,deleteDoc, doc} from "firebase/firestore";
import { useFirebase } from "../../config/FirebaseContext";
import styles from "./MyPosts.module.css"
import LikeBtn from "../LikeBtn/LikeBtn";
import Firestore from "firestore";
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
            

                const postWhitLikes = await Promise.all(
                  filteredData.map(async ( post) =>{
                    const postId = post?.id
                    console.log( postId);
                    const likeRef = collection(db, "InterestedCars");
                    const likesQuery = query(likeRef, where("CarId", "==", postId));
                    console.log(likesQuery)
                    const likesCollection = await getDocs(likesQuery); // Corrected variable name
                    
                    console.log(likesCollection.docs);


                    const likesData = likesCollection.docs.map((doc)=>
                     doc.data());
                    console.log(likesData)
                    return {...post, likes: likesData};
                  })
                  )
                  console.log(postWhitLikes)
                  setPostList(postWhitLikes);
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