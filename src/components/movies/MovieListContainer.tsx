import React from "react";
import Carousel from "@/components/carousel/Carousel";
import { MovieService } from "@/services/Movie";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

async function getMovies(listType: string) {
  const jsonData = await MovieService.getMovies(listType);
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
  const topRatedMovies = await getMovies("top_rated");
  const upcomingMovies = await getMovies("upcoming");

  return (
    <div className="m-16 flex flex-col gap-6">
      <Carousel title="Now Playing" items={nowPlayingMovies}></Carousel>
      <Carousel title="Top Rated" items={topRatedMovies}></Carousel>
      <Carousel title="Upcoming" items={upcomingMovies}></Carousel>
    </div>
  );
}
