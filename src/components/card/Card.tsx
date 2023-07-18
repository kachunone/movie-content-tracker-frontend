import React from "react";
import styles from "./Card.module.css";
import Image from "next/image";

const imageLoader = () => {
  return "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg";
};

const Card = () => {
  return (
    <div className={styles.container}>
      <Image
        loader={imageLoader}
        src="movie.png"
        alt="Picture of the author"
        width={200}
        height={300}
        className={styles.img}
      />
    </div>
  );
};

export default Card;
