"use client";

import React from "react";
import styles from "./SearchBar.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder="Search for a movie"></input>
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
