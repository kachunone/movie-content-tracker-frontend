import styles from "./page.module.css";
import * as React from "react";
import SearchBar from "@/components/searchbar/SearchBar";
import Carousel from "@/components/carousel/Carousel";
import MoviesList from "@/components/movies/MoviesList";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar_container}>
        <SearchBar></SearchBar>
      </div>
      <div className=" mt-32">
        <Carousel title="Now Playing">
          <MoviesList listType="now_playing"></MoviesList>
        </Carousel>
        <Carousel title="Popular">
          <MoviesList listType="popular"></MoviesList>
        </Carousel>
        <Carousel title="Top Rated">
          <MoviesList listType="top_rated"></MoviesList>
        </Carousel>
        <Carousel title="Upcoming">
          <MoviesList listType="upcoming"></MoviesList>
        </Carousel>
      </div>
    </div>
  );
}
