import React from "react";
import MoviesCard from "./MoviesCard";
import MovieBar from "./MovieBar";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MoviesListProps {
  listType: "now_playing" | "popular" | "top_rated" | "upcoming" | "search";
  params?: string;
}

async function getMovies(listType: string, params?: string) {
  const moviesAPI = process.env.NEXT_PUBLIC_MOVIES_API_KEY;

  const url =
    listType !== "search"
      ? `https://api.themoviedb.org/3/movie/${listType}?api_key=${moviesAPI}`
      : `https://api.themoviedb.org/3/search/movie?query=${params}&api_key=${moviesAPI}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}

export default async function MoviesList(props: MoviesListProps) {
  const movies = await getMovies(props.listType, props.params);

  if (movies.results.length === 0) {
    return (
      <h6 className="text-yellow-600 self-center bg-black rounded-md p-2 bg-opacity-30 text-4xl">
        Sorry, no movie found!
      </h6>
    );
  }

  const moviesList: [] = movies.results.map((item: Movie) => {
    return props.listType !== "search" ? (
      <MoviesCard
        key={item.id}
        id={item.id}
        posterPath={item.poster_path}
        title={item.title}
        releaseDate={item.release_date}
        voteAverage={item.vote_average}
      ></MoviesCard>
    ) : (
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
