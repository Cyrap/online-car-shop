import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useFirebase } from "../../config/FirebaseContext";
import styles from "./Popup.module.css";

const Popup = () => {
    const { id } = useParams();
    const userId = id;
    const [postList, setPostList] = useState();
    const { db } = useFirebase();
    useEffect(() => {
        const getPostList = async () => {
            try {
                const postDocumentRef = doc(db, "Cars", userId);
                const docSnap = await getDoc(postDocumentRef);

                if (docSnap.exists()) {
                    const postData = {
                        ...docSnap.data(),
                        id: docSnap.id,
                    };
                    setPostList([postData]);
                } else {
                    alert("Document not found");
                }
            } catch (err) {
                alert(err);
            }
        };

        if (userId) {
            getPostList();
        }
    }, [userId, db]);

    return (
        <div className={styles.container}>
            {postList?.map((car, index) => (
                <div key={index} className={styles.div}>
                    <div className={styles.img}>
                        <img loading="lazy" src={car.imageURL} alt="" />
                    </div>
                   <div className={styles.contentInfo}>
                   <p>Model: {car.model}</p>
                    <p>Company: {car.company}</p>
                    <p>Color: {car.color}</p>
                    <p>
                        Entry Year: {car.entryYear?.toDate().toLocaleDateString() || "N/A"}
                    </p>
                    <p>
                        Made Year: {car.madeYear?.toDate().toLocaleDateString() || "N/A"}
                    </p>
                   </div>
                </div>
            ))}
        </div>
    );
};

export default Popup;
