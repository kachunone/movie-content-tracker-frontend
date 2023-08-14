"use client";

import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete-movie/${props.movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    const result = await res.json();
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
          <CircularProgress color="success" />
        </div>
      </Modal>
    </>
  );
}
