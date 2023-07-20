"use client";

import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../card/Card";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CircularProgress } from "@mui/material";
import useSWR from "swr";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
}

interface MoviesSliderProps {
  listType: "now_playing" | "popular" | "top_rated" | "upcoming";
  listTitle: "Now Playing" | "Popular" | "Top Rated" | "Upcoming";
}

const MoviesSlider: React.FC<MoviesSliderProps> = (props) => {
  const slider = React.useRef<Slider | null>(null);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const moviesAPI = process.env.NEXT_PUBLIC_MOVIES_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${props.listType}?api_key=${moviesAPI}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  let MoviesList = [];
  if (data) {
    MoviesList = data.results.map((item: Movie) => {
      return (
        <Card
          key={item.id}
          posterPath={item.poster_path}
          title={item.title}
          releaseDate={item.release_date}
          voteAverage={item.vote_average}
        ></Card>
      );
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
    <React.Fragment>
      {/* {!isLoading && ( */}
      <div className="flex flex-col items-center justify-center p-6">
        <h6 className="text-yellow-500 text-2xl mb-2 font-semibold">
          {props.listTitle}
        </h6>
        <div className="flex justify-center items-center h-70 w-full ">
          <KeyboardArrowLeftIcon
            style={{
              width: "3rem",
              height: "3rem",
            }}
            className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
            onClick={() => slider?.current?.slickPrev()}
          >
            Prev
          </KeyboardArrowLeftIcon>
          {isLoading && (
            <div className="w-[65vw] h-[280px] flex justify-center items-center">
              <CircularProgress style={{ color: "yellow" }} />
            </div>
          )}
          {!isLoading && (
            <Slider ref={slider} {...settings} className="w-[65vw] ">
              {MoviesList}
            </Slider>
          )}
          <KeyboardArrowRightIcon
            onClick={() => slider?.current?.slickNext()}
            style={{
              width: "3rem",
              height: "3rem",
            }}
            className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
          >
            Next
          </KeyboardArrowRightIcon>
        </div>
      </div>
      {/* )} */}
    </React.Fragment>
  );
};

export default MoviesSlider;
