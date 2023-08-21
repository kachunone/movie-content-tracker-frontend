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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Alert, AlertColor } from "@mui/material";

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
  const [prompt, setPrompt] = useState({ severity: "info", message: "" });

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
      setPrompt({ severity: "info", message: "Login Required" });
      handleOpen();
      return;
    }
    await addToList(mark);
  };

  async function addToList(mark: string) {
    if (!token) {
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
      let msg = { severity: "error", message: "Action Failed" };
      if (response.statusCode === 200) {
        msg = { severity: "success", message: "Movie Added" };
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
      <div onClick={handleClick} className="m-1">
        <BookmarkAddIcon
          style={{ width: "2.5rem", height: "2.5rem" }}
          className="hover:text-yellow-700 cursor-pointer bg-myBlueDark p-2 rounded-full transition-colors duration-300"
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
            backgroundColor: "#201F28",
            color: "#FFDB0E",
          },
          ".MuiMenuItem-root:hover": {
            backgroundColor: "#EAB306",
            color: "#201F28",
          },
          mt: 0.5,
        }}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu("watched");
          }}
        >
          Watched
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu("wish to watch");
          }}
        >
          Wish to watch
        </MenuItem>
      </Menu>

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
    </div>
  );
}
