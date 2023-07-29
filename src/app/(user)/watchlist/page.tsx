import React from "react";
import { cookies } from "next/headers";
import MovieBar from "@/components/movies/MovieBar";
import { Movie } from "@mui/icons-material";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
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
      cache: "no-cache",
    }
  );

  const response = await res.json();
  return Array.isArray(response) ? response : [];
}

export default async function WatchList() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const movies = await getMovies(token?.value);

  if (movies.length === 0) {
    return (
      <div className="h-screen min-h-screen mt-16 bg-myBlueLight text-white flex flex-col items-center text-4xl">
        <h6 className="text-yellow-600 self-center bg-black rounded-md p-2 bg-opacity-30 text-4xl mt-7">
          Sorry, no movie found!
        </h6>
      </div>
    );
  }

  const moviesList = movies.map((movie: Movie) => {
    return (
      <MovieBar
        key={movie.id}
        id={movie.id}
        posterPath={movie.poster_path}
        title={movie.title}
        releaseDate={movie.release_date}
        overview={movie.overview}
        isWachList={true}
      ></MovieBar>
    );
  });

  return (
    <div className="min-h-screen mt-16 bg-myBlueDark text-white flex flex-col items-center">
      <h6 className="text-yellow-500 text-2xl font-semibold self-center mt-5">
        Watch List
      </h6>
      <div className="text-xl w-[700px] max-w-[90vw] mt-5 flex flex-col gap-3 mb-5">
        {moviesList}
      </div>
    </div>
  );
}
