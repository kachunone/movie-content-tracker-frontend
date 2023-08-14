"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MoviesCard from "../movies/MoviesCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Movie {
  key: number;
  id: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
}

interface CarouselProps {
  title: string;
  items: Movie[];
}

export default function Carousel(props: CarouselProps) {
  const slider = React.useRef<Slider | null>(null);

  const items = (props.items as Movie[]).map((movie: Movie) => (
    <div key={movie.id} style={{ width: 180 }}>
      <MoviesCard
        id={movie.id}
        posterPath={movie.posterPath}
        title={movie.title}
        releaseDate={movie.releaseDate}
        voteAverage={movie.voteAverage}
      ></MoviesCard>
    </div>
  ));

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2800,
    variableWidth: true,
    centerMode: true,
    draggable: false,
    adaptiveHeight: true,
  };

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <h6 className="text-yellow-500 text-2xl mb-2 font-semibold ">
        {props.title}
      </h6>
      <div className="flex justify-center items-center w-[75vw]">
        <KeyboardArrowLeftIcon
          style={{
            width: "3rem",
            height: "3rem",
          }}
          className="text-yellow-500 hover:text-white cursor-pointer transition duration-300"
          onClick={() => slider?.current?.slickPrev()}
        >
          Prev
        </KeyboardArrowLeftIcon>
        <Slider ref={slider} {...settings} className="rounded-md w-[90%]">
          {items}
        </Slider>
        <KeyboardArrowRightIcon
          onClick={() => slider?.current?.slickNext()}
          style={{
            width: "3rem",
            height: "3rem",
          }}
          className="text-yellow-500 hover:text-white cursor-pointer transition duration-300"
        >
          Next
        </KeyboardArrowRightIcon>
      </div>
    </div>
  );
}
