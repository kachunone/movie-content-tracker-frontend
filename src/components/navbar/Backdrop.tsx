import React from "react";
import styles from "./Backdrop.module.css";

interface backdropProps {
  onClick: () => void;
}

const Backdrop: React.FC<backdropProps> = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick}></div>;
};

export default Backdrop;
