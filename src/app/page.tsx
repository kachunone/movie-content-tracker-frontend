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
      <Carousel>
        <MoviesList listType="now_playing" listTitle="Now Playing"></MoviesList>
      </Carousel>
      <Carousel>
        <MoviesList listType="popular" listTitle="Popular"></MoviesList>
      </Carousel>
      <Carousel>
        <MoviesList listType="top_rated" listTitle="Top Rated"></MoviesList>
      </Carousel>
      <Carousel>
        <MoviesList listType="upcoming" listTitle="Upcoming"></MoviesList>
      </Carousel>
    </div>
  );
}
