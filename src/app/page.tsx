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
      <h6 className={styles.list_title}>Now Playing</h6>
      <CustomArrows listType="now_playing"></CustomArrows>
      <h6 className={styles.list_title}>Popular</h6>
      <CustomArrows listType="popular"></CustomArrows>
      <h6 className={styles.list_title}>Top Rated</h6>
      <CustomArrows listType="top_rated"></CustomArrows>
      <h6 className={styles.list_title}>Upcoming</h6>
      <CustomArrows listType="upcoming"></CustomArrows>
    </div>
  );
}
