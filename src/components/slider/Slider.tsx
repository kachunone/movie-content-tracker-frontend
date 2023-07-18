"use client";

import React from "react";
import Slider, { Settings } from "react-slick";
import styles from "./Slider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../card/Card";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useSWR from "swr";

interface Movie {
  poster_path: string;
}

interface CustomArrowsProps {
  listType: "now_playing" | "popular" | "top_rated" | "upcoming";
}

const CustomArrows: React.FC<CustomArrowsProps> = (props) => {
  const slider = React.useRef<Slider | null>(null);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const moviesAPI = process.env.NEXT_PUBLIC_MOVIES_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${props.listType}?api_key=${moviesAPI}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  let MoviesList = [];
  if (data) {
    MoviesList = data.results.map((item: Movie, index: number) => {
      return <Card key={index} posterPath={item.poster_path}></Card>;
    });
  }

  const settings: Settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1800,
    variableWidth: true,
    centerMode: true,
  };

  return (
    <div className={styles.container}>
      <KeyboardArrowLeftIcon
        style={{
          color: "#ffdb10",
          width: "3rem",
          height: "3rem",
          cursor: "pointer",
        }}
        onClick={() => slider?.current?.slickPrev()}
      >
        Prev
      </KeyboardArrowLeftIcon>
      <Slider ref={slider} {...settings} className={styles.slider}>
        {MoviesList}
      </Slider>
      <KeyboardArrowRightIcon
        onClick={() => slider?.current?.slickNext()}
        style={{
          color: "#ffdb10",
          width: "3rem",
          height: "3rem",
          cursor: "pointer",
        }}
      >
        Next
      </KeyboardArrowRightIcon>
    </div>
  );
};

export default CustomArrows;
