import React from "react";
import styles from "./Footer.module.css"
const Footer = () =>{
return<div>
    <div className={styles.container}>
        <ul className={styles.listStyle}>
            <li>FB:    <a href="">Н.Сугар</a></li>
            <li>Github:   <a href="https://github.com/Cyrap?tab=overview&from=2024-01-01&to=2024-01-21">Cyrap</a></li>
            <li>Phone : 94232720</li>
        </ul>
        <ul className={styles.options}>
            <li>Холбоо барих</li>
            <li>Сэтгэгдэл үлдээх</li>
            <li>Миний CV</li>
        </ul>

        <div className={styles.bottom}>Online car shop template © 2024 Developed by: <a href="https://www.facebook.com/profile.php?id=100011620122996">Н.Сугар</a></div>
    </div>
</div>
}
export default Footer;
