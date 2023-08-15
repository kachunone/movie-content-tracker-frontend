"use client";

import React, { useContext, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { getCookie } from "cookies-next";
import { StaticImageData } from "next/image";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { MovieService } from "@/services/Movie";
import { AuthContext } from "@/context/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { StepIconClassKey } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface MovieOptBtnProps {
  data: {
    movieId: number;
    poster: string;
    title: string;
    releaseDate: string;
    overview: string;
    mark: string;
  };
}

export default function MovieOptBtn(props: MovieOptBtnProps) {
  const token = getCookie("token");
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [prompt, setPrompt] = useState({ title: "", message: "" });

  //loading modal
  const [isLoading, setIsLoading] = React.useState(false);
  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);

  async function addToList() {
    if (!token) {
      console.log("no user");
      return;
    }

    try {
      startLoading();
      const response = await MovieService.addMovie(props.data, token as string);
      endLoading();
      let msg = { title: "Failure", message: "Movie may be added already" };
      if (response.statusCode === 200) {
        router.refresh();
        msg = { title: "Success", message: "Movie has been added" };
      }
      setPrompt(msg);
      handleOpen();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div
        onClick={async () => {
          if (!isLoggedIn) {
            console.log("login status: ", isLoggedIn);
            setPrompt({ title: "Failure", message: "Please log in first" });
            handleOpen();
            return;
          }
          await addToList();
        }}
      >
        <BookmarkAddIcon
          className="ml-3 hover:text-yellow-700 cursor-pointer bg-myBlueDark p-2 rounded-full transition-colors duration-300"
          style={{ width: "2.5rem", height: "2.5rem" }}
        ></BookmarkAddIcon>
      </div>
      <Modal open={open} onClose={handleClose} className="">
        <div className="absolute  outline-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-myBlueLight text-yellow-500 flex flex-col items-center rounded-lg p-4">
          <p>{prompt.title}</p>
          <p>{prompt.message}</p>
        </div>
      </Modal>
      <Modal open={isLoading}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-myBlueLight text-yellow-500 flex flex-col items-center rounded-lg p-4 outline-none">
          <CircularProgress color="success" />
        </div>
      </Modal>
    </div>
  );
}
