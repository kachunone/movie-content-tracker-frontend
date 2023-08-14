import * as React from "react";
import SearchBar from "@/components/searchbar/SearchBar";
import MovieListContainer from "@/components/movies/MovieListContainer";

export default function Home() {
  return (
    <div className="bg-myBlueDark flex flex-col items-center w-full min-h-screen">
      <div className="bg-myBlueLight h-16 flex items-center justify-center fixed top-16 left-0 w-full z-40">
        <SearchBar />
      </div>
      <MovieListContainer />
    </div>
  );
}
