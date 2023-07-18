import styles from "./page.module.css";
import * as React from "react";
import SearchBar from "@/components/searchbar/SearchBar";
import CustomArrows from "@/components/slider/Slider";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar_container}>
        <SearchBar></SearchBar>
      </div>
      <CustomArrows></CustomArrows>
    </div>
  );
}
