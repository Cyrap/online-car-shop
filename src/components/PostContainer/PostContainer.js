import React from "react";
import LikeBtn from "../LikeBtn/LikeBtn";
import styles from "./PostContainer.module.css";
import useNavigation from "../../hooks/useNavigation";
import notFoundUrl from "../../img/notFound.png"
const PostContainer = ({ id, model, company, imageURL }) => {
  const { handleNavigation } = useNavigation();

  return (
    <div className={styles.div}>
      <div className={styles.img} onClick={() => handleNavigation({ id })}>
      {imageURL ? 
          <img loading="lazy" src={imageURL} alt="" />
          :
          <img loading="lazy" src={notFoundUrl} alt="" />
          }
      </div>
      <p>Загвар: {model}</p>
      <p>Үилдвэр: {company}</p>
      <LikeBtn e={id} />
    </div>
  );
};

export default PostContainer;
