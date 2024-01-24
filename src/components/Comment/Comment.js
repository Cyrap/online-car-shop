import styles from "./Comment.module.css"

const Comment = ()=>{
    return  <div className={styles.container}>
        <textarea placeholder="Сэтгэгдэл үлдээх"></textarea>
        <button><i class="fa-solid fa-paper-plane fa-2x"></i></button>
    </div>
 }

export default Comment;