import React from "react";
import styles from "./SearchBar.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder="Search for a movie"></input>
      <SearchOutlinedIcon
        style={{
          width: "2.5rem",
          height: "2.5rem",
        }}
        className="bg-yellow-500 rounded-md p-1 cursor-pointer mr-1 hover:bg-yellow-600"
      ></SearchOutlinedIcon>
    </div>
  );
};

export default SearchBar;
