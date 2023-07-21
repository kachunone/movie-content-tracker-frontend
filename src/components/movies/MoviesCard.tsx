import React from "react";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface MoviesCardProps {
  id: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
}

const MoviesCard: React.FC<MoviesCardProps> = (props) => {
  const releasedYear = props.releaseDate.split("-")[0];
  const ratedPercent = props.voteAverage * 10;

  return (
    <Link
      href={`/movies/${props.id}`}
      className=" group mr-4 rounded-lg flex flex-col w-full h-full cursor-pointer outline-none mb-4"
    >
      <Image
        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.posterPath}`}
        alt="Picture of the author"
        width={150}
        height={225}
        className="rounded-lg w-auto h-auto"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        placeholder="blur"
      />
      <div className="self-end -mt-7 mr-1 relative inline-flex">
        <CircularProgress
          variant="determinate"
          value={ratedPercent}
          className=" bg-myBlueDark rounded-full text-yellow-500"
        />
        <div className="text-yellow-500 text-xs absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
          {`${ratedPercent}%`}
        </div>
      </div>
      <div className="w-[120px]">
        <h3 className="group-hover:text-white text-sm text-yellow-500 truncate ... transition duration-300">
          {props.title}
        </h3>
        <h3 className="group-hover:text-white text-sm text-yellow-500 transition duration-300">
          {releasedYear}
        </h3>
      </div>
    </Link>
  );
};

export default MoviesCard;
