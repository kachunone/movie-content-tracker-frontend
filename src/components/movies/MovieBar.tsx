import React from "react";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NoneImage from "../../../public/peakpx.jpg";
import MovieDeleteBtn from "./MovieDeleteBtn";

interface MovieBarProps {
  id: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  voteAverage?: number;
  overview: string;
  isWachList?: boolean;
}

export default function MovieBar(props: MovieBarProps) {
  const releasedYear = props.releaseDate.split("-").reverse().join("/");

  let ratedPercent = undefined;
  if (props.voteAverage) {
    ratedPercent = Math.floor(props.voteAverage * 10);
  }

  const posterPath =
    props.posterPath !== null
      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.posterPath}`
      : NoneImage;

  return (
    <div className=" h-48 w-full flex bg-black rounded-lg bg-opacity-40">
      <Image
        src={posterPath}
        alt="Picture of the author"
        width={150}
        height={225}
        style={{ width: "auto", height: "auto" }}
        className=" rounded-lg w-auto h-auto"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        placeholder="blur"
        priority={true}
      />

      <div className="flex flex-col w-full h-full p-3">
        <div className="text-yellow-500">
          <Link
            className="line-clamp-1 font-semibold hover:text-white transition-colors duration-300 text-base"
            href={`/movies/${props.id}`}
          >
            {props.title}
          </Link>
          <p className=" text-sm text-yellow-600">{releasedYear}</p>
        </div>

        <div className="flex p-3 pl-0">
          <div className="relative inline-flex">
            {ratedPercent && (
              <>
                <CircularProgress
                  variant="determinate"
                  value={ratedPercent}
                  className="bg-myBlueDark rounded-full "
                  style={{
                    color: "#EAB306",
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                />
                <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center text-yellow-500 text-xs">{`${ratedPercent}%`}</div>
              </>
            )}
            {props.isWachList && (
              <MovieDeleteBtn movieId={props.id}></MovieDeleteBtn>
            )}
          </div>
        </div>
        <p className="text-yellow-600 line-clamp-3 text-sm">{props.overview}</p>
      </div>
    </div>
  );
}
