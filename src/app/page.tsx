import * as React from "react";
import SearchBar from "@/components/searchbar/SearchBar";
import MovieListContainer from "@/components/movies/MovieListContainer";

export default function Home() {
  return (
    <div className="bg-myBlueDark flex flex-col items-center  w-full min-h-screen">
      <div className="bg-myBlueLight h-16 flex items-center justify-center w-full mt-16">
        <SearchBar />
      </div>
      <MovieListContainer />
    </div>
  );
}
