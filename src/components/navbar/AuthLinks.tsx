import React from "react";
import styles from "./AuthLinks.module.css";
import Link from "next/link";

interface AuthLinksProps {
  classname?: string;
}

const AuthLinks: React.FC<AuthLinksProps> = (props) => {
  const place = props.classname === "drawer" ? styles.drawer : styles.header;

  return (
    <div className={place}>
      <button className={styles.auth_btn}>Login</button>
      <button className={styles.auth_btn}>Sign up</button>
    </div>
  );
};

export default AuthLinks;
