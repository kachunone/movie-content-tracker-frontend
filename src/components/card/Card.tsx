import React from "react";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
}

const Card: React.FC<CardProps> = (props) => {
  const releasedYear = props.releaseDate.split("-")[0];
  const ratedPercent = props.voteAverage * 10;

  return (
    <Link
      href={`/movies/${props.id}`}
      className=" group mr-4 rounded-lg flex flex-col w-[150px] h-[280px] cursor-pointer"
    >
      <Image
        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.posterPath}`}
        alt="Picture of the author"
        width={150}
        height={230}
        className="rounded-lg"
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
      <h3 className="group-hover:text-white text-sm text-yellow-500 truncate ...">
        {props.title}
      </h3>
      <h3 className="group-hover:text-white text-sm text-yellow-500 ">
        {releasedYear}
      </h3>
    </Link>
  );
};

export default Card;
