"use client";

import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NoneImage from "../../../public/peakpx.jpg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Modal from "@mui/material/Modal";
import { MovieService } from "@/services/Movie";
import { Alert, AlertColor } from "@mui/material";

interface MovieBarProps {
  id: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  voteAverage?: number;
  overview: string;
  mark: string;
  isWatchList?: boolean;
  onRemove?: (movieId: number) => void;
}

export default function MovieBar(props: MovieBarProps) {
  const releasedYear = props.releaseDate.split("-").reverse().join("/");

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [prompt, setPrompt] = useState({ severity: "info", message: "" });

  //loading modal
  const [isLoading, setIsLoading] = React.useState(false);
  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);

  const deleteMovie = async () => {
    const token = getCookie("token");
    startLoading();
    const result = await MovieService.deleteMovie(props.id, token as string);
    endLoading();
    if (result.statusCode === 200) {
      if (props.onRemove) {
        props.onRemove(props.id);
      }
    } else {
      const msg = {
        severity: "error",
        message: "Action Failed",
      };
      setPrompt(msg);
      handleOpen();
    }
  };

  let ratedPercent = undefined;
  if (props.voteAverage) {
    ratedPercent = Math.floor(props.voteAverage * 10);
  }

  const posterPath =
    props.posterPath !== null
      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.posterPath}`
      : NoneImage;

  return (
    <>
      <div className="h-48 w-full flex bg-black rounded-lg bg-opacity-40">
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
          <div className="text-yellow-500 grid grid-cols-10 grid-rows-2">
            <Link
              className={`${
                props.isWatchList ? "col-span-9" : "col-span-10"
              } line-clamp-1 font-semibold hover:text-white transition-colors duration-300 text-base`}
              href={`/movies/${props.id}`}
            >
              {props.title}
            </Link>
            <div className="col-span-1 row-span-2 flex justify-end items-start ">
              {props.isWatchList && (
                <DeleteOutlineIcon
                  style={{ width: "2rem", height: "2rem" }}
                  className="text-red-700 hover:text-red-300 cursor-pointer bg-myBlueDark rounded-full transition-colors duration-300 p-1"
                  onClick={deleteMovie}
                ></DeleteOutlineIcon>
              )}
            </div>
            <p className=" text-sm text-yellow-600">{releasedYear}</p>
          </div>

          <div className="flex p-3 pl-0">
            <div className="relative inline-flex">
              {ratedPercent && (
                <>
                  <CircularProgress
                    variant="determinate"
                    value={ratedPercent}
                    className="bg-myBlueDark rounded-full"
                    style={{
                      color: "#EAB306",
                      width: "2.5rem",
                      height: "2.5rem",
                    }}
                  />
                  <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center text-yellow-500 text-xs">{`${ratedPercent}%`}</div>
                </>
              )}
              {props.isWatchList && (
                <p className="bg-yellow-100 text-yellow-200 p-2 rounded bg-opacity-20 text-sm">
                  {props.mark.toUpperCase()}
                </p>
              )}
            </div>
          </div>
          <p className="text-yellow-600 line-clamp-3 text-sm">
            {props.overview}
          </p>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute  outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Alert variant="filled" severity={prompt.severity as AlertColor}>
            {prompt.message}
          </Alert>
        </div>
      </Modal>
      <Modal open={isLoading}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500">
          <CircularProgress style={{ color: "#FFDB0E" }} />
        </div>
      </Modal>
    </>
  );
}
