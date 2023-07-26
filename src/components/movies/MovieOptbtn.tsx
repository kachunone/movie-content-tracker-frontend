"use client";

import React, { useContext } from "react";
import { AuthContext } from "@/app/context/auth";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

export default function MovieOptBtn() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      {!isLoggedIn && (
        <BookmarkAddIcon
          className="ml-3 hover:text-yellow-700 cursor-pointer bg-myBlueDark p-2 rounded-full transition-colors duration-300"
          style={{ width: "2.5rem", height: "2.5rem" }}
        ></BookmarkAddIcon>
      )}
      {isLoggedIn && (
        <BookmarkAddedIcon
          className="ml-3 hover:text-blue-700 text-blue-500 cursor-pointer bg-myBlueDark p-2 rounded-full transition-colors duration-300"
          style={{ width: "2.5rem", height: "2.5rem" }}
        ></BookmarkAddedIcon>
      )}
    </div>
  );
}
