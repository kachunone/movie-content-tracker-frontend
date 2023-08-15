import React from "react";
import Carousel from "@/components/carousel/Carousel";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

async function getMovies(listType: string) {
  const moviesAPI = process.env.NEXT_PUBLIC_MOVIES_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${listType}?api_key=${moviesAPI}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const jsonData = await res.json();

  const moviesList = jsonData.results.map((item: Movie) => {
    return {
      key: item.id,
      id: item.id,
      posterPath: item.poster_path,
      title: item.title,
      releaseDate: item.release_date,
      voteAverage: item.vote_average,
    };
  });

  return moviesList;
}

export default async function MovieListContainer() {
  const nowPlayingMovies = await getMovies("now_playing");
  const popularMovies = await getMovies("popular");
  const topRatedMovies = await getMovies("top_rated");
  const upcomingMovies = await getMovies("upcoming");

  return (
    <div className="mt-3 flex flex-col gap-6">
      <Carousel title="Now Playing" items={nowPlayingMovies}></Carousel>
      <Carousel title="Popular" items={popularMovies}></Carousel>
      <Carousel title="Top Rated" items={topRatedMovies}></Carousel>
      <Carousel title="Upcoming" items={upcomingMovies}></Carousel>
    </div>
  );
}
