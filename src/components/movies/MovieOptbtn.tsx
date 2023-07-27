"use client";

import React, { useContext } from "react";
import { AuthContext } from "@/app/context/auth";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { getCookie } from "cookies-next";
import Image, { StaticImageData } from "next/image";

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

async function addToList(props: MovieOptBtnProps, token?: string) {
  if (!token) {
    console.log("no user");
    return;
  } else {
    console.log(token);
  }

  try {
    const res = await fetch(`http://localhost:3001/user/add-movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: props.data.movieId,
        poster_path: props.data.poster,
        title: props.data.title,
        release_date: props.data.releaseDate,
        overview: props.data.overview,
        mark: props.data.mark,
      }),
    });
    const movie = await res.json();
    return movie;
  } catch (error) {
    console.log(error);
  }
}

export default function MovieOptBtn(props: MovieOptBtnProps) {
  // const { isLoggedIn } = useContext(AuthContext);
  const token = getCookie("token");

  return (
    <div>
      <div
        onClick={() => {
          addToList(props, token?.toString());
        }}
      >
        <BookmarkAddIcon
          className="ml-3 hover:text-yellow-700 cursor-pointer bg-myBlueDark p-2 rounded-full transition-colors duration-300"
          style={{ width: "2.5rem", height: "2.5rem" }}
        ></BookmarkAddIcon>
      </div>
    </div>
  );
}
