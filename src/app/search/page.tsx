import React from "react";
import SearchBar from "@/components/searchbar/SearchBar";
import MoviesList from "@/components/movies/MoviesList";

const Search: React.FC = () => {
  return (
    <div className="bg-myBlueDark flex flex-col items-center w-full min-h-screen">
      <div className="bg-myBlueLight h-16 flex items-center justify-center w-full fixed top-16 left-0 z-40">
        <SearchBar></SearchBar>
      </div>
      <div className="flex flex-col w-[70vw] h-auto mb-5 gap-5 mt-40">
        <h6 className="text-yellow-500 text-2xl font-semibold self-center">
          Result
        </h6>
        <MoviesList listType="search" params="interstellar"></MoviesList>
      </div>
    </div>
  );
};

export default Search;
