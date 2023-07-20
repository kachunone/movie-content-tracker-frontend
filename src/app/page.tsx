import styles from "./page.module.css";
import * as React from "react";
import SearchBar from "@/components/searchbar/SearchBar";
import MoviesSlider from "@/components/slider/MoviesSlider";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar_container}>
        <SearchBar></SearchBar>
      </div>
      <MoviesSlider
        listType="now_playing"
        listTitle="Now Playing"
      ></MoviesSlider>
      <MoviesSlider listType="popular" listTitle="Popular"></MoviesSlider>
      <MoviesSlider listType="top_rated" listTitle="Top Rated"></MoviesSlider>
      <MoviesSlider listType="upcoming" listTitle="Upcoming"></MoviesSlider>
    </div>
  );
}
