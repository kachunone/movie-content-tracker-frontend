import * as React from "react";
import SearchBar from "@/components/searchbar/SearchBar";
import Carousel from "@/components/carousel/Carousel";
import MoviesList from "@/components/movies/MoviesList";

export default function Home() {
  return (
    <div className="bg-myBlueDark flex flex-col items-center w-full min-h-screen">
      <div className="bg-myBlueLight h-16 flex items-center justify-center w-full fixed top-16 left-0 z-40">
        <SearchBar></SearchBar>
      </div>
      <div className="mt-32 flex flex-col gap-6">
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
