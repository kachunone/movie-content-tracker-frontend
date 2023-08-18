import React from "react";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NoneImage from "../../../public/peakpx.jpg";

interface MoviesCardProps {
  id: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
}

export default function MoviesCard(props: MoviesCardProps) {
  const releasedYear = props.releaseDate.split("-")[0];
  const ratedPercent = Math.floor(props.voteAverage * 10);

  const posterPath =
    props.posterPath !== null
      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.posterPath}`
      : NoneImage;

  return (
    <Link
      href={`/movies/${props.id}`}
      className=" group rounded-md m-1 flex flex-col cursor-pointer outline-none bg-black bg-opacity-50 p-1"
    >
      <Image
        src={posterPath}
        alt="Picture of the author"
        width={150}
        height={225}
        style={{ width: "auto", height: "auto" }}
        className="rounded w-auto h-auto"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        placeholder="blur"
      />
      <div className="self-end -mt-7 mr-1 relative inline-flex">
        <CircularProgress
          variant="determinate"
          value={ratedPercent}
          className=" bg-myBlueDark rounded-full"
          style={{ color: "#EAB306" }}
        />
        <div className="text-yellow-500 text-xs absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
          {`${ratedPercent}%`}
        </div>
      </div>
      <div>
        <h3 className="group-hover:text-white text-sm text-yellow-500 truncate ... transition duration-300">
          {props.title}
        </h3>
        <h3 className="group-hover:text-white text-sm text-yellow-500 transition duration-300">
          {releasedYear}
        </h3>
      </div>
    </Link>
  );
}
