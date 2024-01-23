import react, { useEffect } from "react"
import { useState } from "react";
import {useUser} from "../../config/UserProvider"
import {collection, getDocs, query, where ,deleteDoc, doc} from "firebase/firestore";
import { useFirebase } from "../../config/FirebaseContext";
import styles from "./MyPosts.module.css"
import LikeBtn from "../LikeBtn/LikeBtn";
import Firestore from "firestore";
import notFoundUrl from "../../img/notFound.png"
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
                    const likeRef = collection(db, "InterestedCars");
                    const likesQuery = query(likeRef, where("CarId", "==", "7Z2os1dPBvv11zVEW6oq"));
                    const likesCollection = await getDocs(likesQuery);
                    const likesData = likesCollection.docs.map((doc)=>
                    doc.data());
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

    postList?.map((e)=>{
      e.likes.map(e=>{console.log(e.UserId)})
    })

   return (
  <div className={styles.container}>
    {postList?.map((car, index) => (
      <div key={index} className={styles.div}>
        <div className={styles.img}>
          {car.imageURL ? 
          <img loading="lazy" src={car.imageURL} alt="" />
          :
          <img loading="lazy" src={notFoundUrl} alt="" />
          }
        </div>
        <p>Загвар: {car.model}</p>
        <p>Үилдвэр: {car.company}</p>
        <p>Өнгө: {car.color}</p>
        <p>
            Орж ирсэн он: {car.entryYear?.toDate().toLocaleDateString() || "N/A"}
        </p>
        <p>
          Үилдвэрлэсэн он: {car.madeYear?.toDate().toLocaleDateString() || "N/A"}
        </p>
        <p>
          Нийтэлсэн хугацаа: {car.postDate?.toDate().toLocaleDateString() || "N/A"}
        </p>
        {car.likes.map((e)=>{
          <p>{e.UserId}</p>
        })}
        <button onClick={() => deletePost(car.id)}>
          deleteDoc
        </button>
      </div>
    ))}
  </div>
);

}

export default MyPosts;