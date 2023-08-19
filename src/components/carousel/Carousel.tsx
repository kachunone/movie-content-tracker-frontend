"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MoviesCard from "../movies/MoviesCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { LazyLoadTypes } from "react-slick";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

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
  const [isSlideReady, setSlideReady] = useState(false);

  const items = (props.items as Movie[]).map((movie: Movie) => (
    <div key={movie.id}>
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
    draggable: false,
    slidesToShow: 6,
    lazyLoad: "anticipated" as LazyLoadTypes,
    onInit: () => {
      setSlideReady(true);
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 ">
      {isSlideReady && (
        <h6 className="text-yellow-500 text-2xl mb-2 font-semibold ">
          {props.title}
        </h6>
      )}
      <div className="flex items-center justify-center w-[75vw]">
        {isSlideReady && (
          <KeyboardArrowLeftIcon
            className="text-yellow-500 hover:text-white cursor-pointer transition duration-300 w-8 h-36 bg-black bg-opacity-50 rounded-md m-1"
            onClick={() => slider?.current?.slickPrev()}
          >
            Prev
          </KeyboardArrowLeftIcon>
        )}
        <Slider ref={slider} {...settings} className="rounded-md w-[90%]">
          {items}
        </Slider>
        {isSlideReady && (
          <KeyboardArrowRightIcon
            className="text-yellow-500 hover:text-white cursor-pointer transition duration-300 w-8 h-36 bg-black bg-opacity-50 rounded-md m-1"
            onClick={() => slider?.current?.slickNext()}
          >
            Next
          </KeyboardArrowRightIcon>
        )}
      </div>
    </div>
  );
}
