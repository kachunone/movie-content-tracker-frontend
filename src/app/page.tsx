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
      <CustomArrows
        listType="now_playing"
        listTitle="Now Playing"
      ></CustomArrows>
      <CustomArrows listType="popular" listTitle="Popular"></CustomArrows>
      <CustomArrows listType="top_rated" listTitle="Top Rated"></CustomArrows>
      <CustomArrows listType="upcoming" listTitle="Upcoming"></CustomArrows>
    </div>
  );
}
