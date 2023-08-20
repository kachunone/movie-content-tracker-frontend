"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import MovieBar from "@/components/movies/MovieBar";
import { Movie } from "@mui/icons-material";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  mark: string;
}

async function getMovies(token?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/movies`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const response = await res.json();
  return Array.isArray(response) ? response : [];
}

export default function WatchlistPanel() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const token = getCookie("token");

  const removeMovie = (movieId: number) => {
    const updatedMovieList = movieList.filter((movie) => movie.id !== movieId);
    setMovieList(updatedMovieList);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getMovies(token as string);
        setMovieList(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen mt-16 bg-myBlueDark text-white flex flex-col items-center">
      <h6 className="text-yellow-500 text-2xl font-semibold self-center">
        Watch List
      </h6>
      {movieList.length === 0 && (
        <h6 className="text-yellow-600 self-center bg-black rounded-md p-2 bg-opacity-30 text-4xl mt-7">
          no movie added
        </h6>
      )}
      <div className="text-xl w-[700px] max-w-[90vw] mt-5 flex flex-col gap-3 mb-5">
        {movieList.map((movie: Movie) => {
          return (
            <MovieBar
              key={movie.id}
              id={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
              overview={movie.overview}
              isWatchList={true}
              mark={movie.mark}
              onRemove={() => removeMovie(movie.id)}
            ></MovieBar>
          );
        })}
      </div>
    </div>
  );
}
