import React from "react";
import MoviesCard from "./MoviesCard";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
}

interface MoviesListProps {
  listType: "now_playing" | "popular" | "top_rated" | "upcoming";
  listTitle: "Now Playing" | "Popular" | "Top Rated" | "Upcoming";
}

async function getMovies(listType: string) {
  const moviesAPI = process.env.NEXT_PUBLIC_MOVIES_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${listType}?api_key=${moviesAPI}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}

export default async function MoviesList(props: MoviesListProps) {
  const movies = await getMovies(props.listType);
  const moviesList = movies.results.map((item: Movie) => {
    return (
      <MoviesCard
        key={item.id}
        id={item.id}
        posterPath={item.poster_path}
        title={item.title}
        releaseDate={item.release_date}
        voteAverage={item.vote_average}
      ></MoviesCard>
    );
  });

  return moviesList;
}
