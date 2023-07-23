import React from "react";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NoneImage from "../../../public/peakpx.jpg";

interface MovieBarProps {
  id: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
  overview: string;
}

const MovieBar: React.FC<MovieBarProps> = (props) => {
  const releasedYear = props.releaseDate.split("-").reverse().join("/");
  const ratedPercent = Math.floor(props.voteAverage * 10);

  const posterPath =
    props.posterPath !== null
      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.posterPath}`
      : NoneImage;

  return (
    <Link
      href={`/movies/${props.id}`}
      className=" h-48 w-full flex bg-black rounded-lg bg-opacity-40"
    >
      <Image
        src={posterPath}
        alt="Picture of the author"
        width={150}
        height={225}
        className=" rounded-lg w-auto h-auto"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        placeholder="blur"
      />

      <div className="flex flex-col w-full h-full p-3">
        <div className="text-yellow-500">
          <p className="line-clamp-1 font-semibold hover:text-white transition-colors duration-300">
            {props.title}
          </p>
          <p className=" text-sm text-yellow-700">{releasedYear}</p>
        </div>

        <div className="flex p-3 pl-0">
          <div className="relative inline-flex">
            <CircularProgress
              variant="determinate"
              value={ratedPercent}
              className="bg-myBlueDark rounded-full "
              style={{ color: "#EAB306", width: "3rem", height: "3rem" }}
            />
            <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center text-yellow-500 text-xs">{`${ratedPercent}%`}</div>
          </div>
        </div>
        <p className="text-yellow-500 line-clamp-2">{props.overview}</p>
      </div>
    </Link>
  );
};

export default MovieBar;
