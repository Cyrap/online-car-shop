import React from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";
import { useEffect, useState } from "react";
import PostContainer from "../PostContainer/PostContainer";
import styles from "./LatestPosts.module.css"
const LatestPost = () => {
    const { db } = useFirebase();
    const [latestPosts, setLatestPosts] = useState([]); // Initialize with an empty array
    const latestPostRef = collection(db, "Cars");
    useEffect(() => {
        const getLatestPost = async () => {
            try {
                const q = query(latestPostRef, orderBy("postDate", 'desc'), limit(10));
                const data = await getDocs(q);

                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                setLatestPosts(filteredData);
            } catch (err) {
                console.error(err);
            }
        };

        getLatestPost();
    }, []);

    return (
        <div className={styles.container}>
        {latestPosts.map((car, index) => (
          <PostContainer {...car} key={index}/>
        ))}
      </div>
    );
};

export default LatestPost;
