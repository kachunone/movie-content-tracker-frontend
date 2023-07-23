"use client";

import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter" && keyword !== "") {
      router.push(`/search?keyword=${keyword}`);
    }
  };

  return (
    <div className="bg-myBlueDark h-12 w-[90vw] max-w-md flex items-center rounded-md">
      <input
        className="h-full bg-transparent text-gray-400 text-base border-none px-2 w-full rounded-sm mr-1 outline-none"
        placeholder="Search for a movie"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyPress}
      ></input>

      <SearchOutlinedIcon
        onClick={() => {
          if (keyword !== "") {
            router.push(`/search?keyword=${keyword}`);
          }
        }}
        style={{
          width: "2.5rem",
          height: "2.5rem",
        }}
        className="bg-yellow-500 rounded-md p-1 cursor-pointer mr-1 hover:bg-yellow-700 transition-colors duration-300"
      ></SearchOutlinedIcon>
    </div>
  );
}
