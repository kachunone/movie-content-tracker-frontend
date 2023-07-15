import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <p className={styles.p}>&copy; 2023 CineTracker. All rights reserved.</p>
    </div>
  );
};

export default Footer;
