import React from "react";
import styles from "./SearchBar.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { ClassNames } from "@emotion/react";

const SearchBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder="Search for a movie"></input>
      <SearchOutlinedIcon
        style={{
          backgroundColor: "#FFDB10",
          width: "2.5rem",
          height: "2.5rem",
        }}
        className={styles.searchIcon}
      ></SearchOutlinedIcon>
    </div>
  );
};

export default SearchBar;
