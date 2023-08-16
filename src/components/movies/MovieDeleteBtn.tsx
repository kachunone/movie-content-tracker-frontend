"use client";

import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { MovieService } from "@/services/Movie";

interface MovieDeleteBtnProps {
  movieId: number;
}

export default function MovieDeleteBtn(props: MovieDeleteBtnProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [prompt, setPrompt] = useState({ title: "", message: "" });

  //loading modal
  const [isLoading, setIsLoading] = React.useState(false);
  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);

  const deleteMovie = async () => {
    const token = getCookie("token");
    startLoading();
    const result = await MovieService.deleteMovie(
      props.movieId,
      token as string
    );
    endLoading();
    if (result.statusCode === 200) {
      router.refresh();
    } else {
      const msg = { title: "Failure", message: "Movie may be added already" };
      setPrompt(msg);
      handleOpen();
    }
  };

  return (
    <>
      <div
        className="text-yellow-500 hover:text-yellow-700 cursor-pointer bg-myBlueDark rounded-full transition-colors duration-300"
        onClick={deleteMovie}
      >
        <DeleteOutlineIcon
          style={{ width: "2.5rem", height: "2.5rem" }}
        ></DeleteOutlineIcon>
      </div>
      <Modal open={open} onClose={handleClose} className="">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-myBlueLight text-yellow-500 flex flex-col items-center rounded-lg p-4 outline-none">
          <p>{prompt.title}</p>
          <p>{prompt.message}</p>
        </div>
      </Modal>
      <Modal open={isLoading}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-myBlueLight text-yellow-500 flex flex-col items-center rounded-lg p-4 outline-none">
          <CircularProgress style={{ color: "#FFDB0E" }} />
        </div>
      </Modal>
    </>
  );
}
