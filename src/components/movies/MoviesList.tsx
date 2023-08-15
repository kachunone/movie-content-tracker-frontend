import React from "react";
import MovieBar from "./MovieBar";
import { MovieService } from "@/services/Movie";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MoviesListProps {
  params: string;
}

export default async function MoviesList(props: MoviesListProps) {
  const movies = await MovieService.searchMovies(props.params);

  if (movies.results.length === 0) {
    return (
      <h6 className="text-yellow-600 self-center bg-black rounded-md p-2 bg-opacity-30 text-4xl">
        Sorry, no movie found!
      </h6>
    );
  }

  const moviesList: [] = movies.results.map((item: Movie) => {
    return (
      <MovieBar
        key={item.id}
        id={item.id}
        posterPath={item.poster_path}
        title={item.title}
        releaseDate={item.release_date}
        voteAverage={item.vote_average}
        overview={item.overview}
      ></MovieBar>
    );
  });

  return moviesList;
}
