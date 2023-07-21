"use client";

import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-myBlueDark h-12 w-[90vw] max-w-md flex items-center rounded-md">
      <input
        className="h-full bg-transparent text-gray-400 text-base border-none px-2 w-full rounded-sm mr-1 outline-none"
        placeholder="Search for a movie"
      ></input>
      <SearchOutlinedIcon
        style={{
          width: "2.5rem",
          height: "2.5rem",
        }}
        className="bg-yellow-500 rounded-md p-1 cursor-pointer mr-1 hover:bg-yellow-700 transition-colors duration-300"
        onClick={() => router.push("/search")}
      ></SearchOutlinedIcon>
    </div>
  );
};

export default SearchBar;
