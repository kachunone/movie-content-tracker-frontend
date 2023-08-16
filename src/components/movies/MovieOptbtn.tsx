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

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface MovieOptBtnProps {
  data: {
    movieId: number;
    poster: string | StaticImageData;
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = async (mark: string) => {
    setAnchorEl(null);
    if (!isLoggedIn) {
      console.log("login status: ", isLoggedIn);
      setPrompt({ title: "Failure", message: "Please log in first" });
      handleOpen();
      return;
    }
    await addToList(mark);
  };

  async function addToList(mark: string) {
    if (!token) {
      console.log("no user");
      return;
    }

    try {
      startLoading();
      const response = await MovieService.addMovie(
        props.data,
        token as string,
        mark
      );
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
      <div onClick={handleClick}>
        <BookmarkAddIcon
          style={{ width: "2.5rem", height: "2.5rem" }}
          className="ml-3 hover:text-yellow-700 cursor-pointer bg-myBlueDark p-2 rounded-full transition-colors duration-300"
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => {
          setAnchorEl(null);
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#201F28", // Set your desired color here
            color: "#FFDB0E",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu("watched");
          }}
          sx={{
            "&:hover": {
              backgroundColor: "#EAB306",
              color: "#201F28",
            },
          }}
        >
          Watched
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu("wish to watch");
          }}
          sx={{
            "&:hover": {
              backgroundColor: "#EAB306",
              color: "#201F28",
            },
          }}
        >
          Wish to watch
        </MenuItem>
      </Menu>

      <Modal open={open} onClose={handleClose} className="">
        <div className="absolute  outline-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-myBlueLight text-yellow-500 flex flex-col items-center rounded-lg p-4">
          <p>{prompt.title}</p>
          <p>{prompt.message}</p>
        </div>
      </Modal>
      <Modal open={isLoading}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-myBlueLight text-yellow-500 flex flex-col items-center rounded-lg p-4 outline-none">
          <CircularProgress style={{ color: "#FFDB0E" }} />
        </div>
      </Modal>
    </div>
  );
}
