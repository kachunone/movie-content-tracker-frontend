import React from "react";
import styles from "./Card.module.css";
import Image from "next/image";

interface CardProps {
  posterPath: string;
}

const Card: React.FC<CardProps> = (props) => {
  const imageLoader = () => {
    return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.posterPath}`;
  };

  return (
    <div className={styles.container}>
      <Image
        loader={imageLoader}
        src="movie.png"
        alt="Picture of the author"
        width={150}
        height={230}
        className={styles.img}
      />
    </div>
  );
};

export default Card;
