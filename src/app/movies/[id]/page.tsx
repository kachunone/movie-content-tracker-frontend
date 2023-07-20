import React from "react";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

function formatCurrency(number: number): string {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

function formatRuntime(runtime: number): string {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

interface MovieInfo {
  poster: string;
  title: string;
  releaseDate: string;
  genres: string;
  releaseYear: string;
  runtime: string;
  voteAvg: number;
  trailer: string;
  tagline: string;
  overview: string;
  status: string;
  originalLang: string;
  budget: string;
  revenue: string;
}

interface Genre {
  id: number;
  name: string;
}

async function getMovie(id: number) {
  const moviesAPI = process.env.NEXT_PUBLIC_MOVIES_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${moviesAPI}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: number } }) {
  const movie = await getMovie(params.id);

  const movieInfo: MovieInfo = {
    poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie["poster_path"]}`,
    title: movie["original_title"],
    releaseDate: movie["release_date"].split("-").reverse().join("/"),
    genres: movie["genres"].map((genre: Genre) => genre.name).join(", "),
    releaseYear: `(${new Date(movie["release_date"]).getFullYear()})`,
    runtime: formatRuntime(movie["runtime"]),
    voteAvg: parseInt((movie["vote_average"] * 10).toFixed(0)),
    trailer: `https://www.youtube.com/watch?v=${movie["imdb_id"]}`,
    tagline: movie["tagline"],
    overview: movie["overview"],
    status: movie["status"],
    originalLang: movie["spoken_languages"][0]?.name || "English",
    budget: movie["budget"] ? formatCurrency(movie["budget"]) : "N/A",
    revenue: movie["revenue"] ? formatCurrency(movie["revenue"]) : "N/A",
  };

  return (
    <div className="min-h-screen mt-16 bg-myBlueDark">
      <div className=" flex flex-col bg-myBlueLight items-center justify-center sm:flex-row ">
        <Image
          src={movieInfo.poster}
          alt="Picture of the author"
          width={300}
          height={300}
          className="rounded-lg ml-6"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          placeholder="blur"
          style={{ margin: "2rem" }}
        />
        <div className=" h-full flex flex-col justify-center items-center text-center text-yellow-400 sm:items-start sm:text-left">
          <div className="m-2">
            <h5 className="text-2xl font-bold">
              {movieInfo.title}{" "}
              <span className=" text-yellow-600">{movieInfo.releaseYear}</span>
            </h5>
            <p className=" text-yellow-600">
              {movieInfo.releaseDate} <span className=" font-extrabold">·</span>{" "}
              {movieInfo.genres} <span className=" font-extrabold">·</span>{" "}
              {movieInfo.runtime}
            </p>
          </div>
          <div className="flex m-2">
            <div className=" relative inline-grid">
              <CircularProgress
                variant="determinate"
                value={movieInfo.voteAvg}
                className=" bg-myBlueDark rounded-full"
                style={{ color: "#FFDB10", width: "4rem", height: "4rem" }}
              />
              <div className="text-yellow-500 font-bold text-lg absolute top-0 right-0 left-0 bottom-0 grid justify-center items-center">
                {`${movieInfo.voteAvg}%`}
              </div>
            </div>
            <div className="flex justify-center items-start flex-col m-2">
              <p className=" leading-4 font-semibold">User</p>
              <p className=" leading-4 font-semibold">Score</p>
            </div>
          </div>
          <p className="m-2 text-yellow-600 italic">{movieInfo.tagline}</p>
          <div className="m-2">
            <p className="mb-1 font-semibold">Overview</p>
            <p className="leading-4 text-sm max-w-3xl">{movieInfo.overview}</p>
          </div>
          <div className="m-2 grid grid-cols-2 gap-6 text-left sm:mb-3 mb-6">
            <div>
              <p className="font-semibold">Status</p>
              <p className="text-yellow-600">{movieInfo.status}</p>
            </div>
            <div>
              <p className="font-semibold">Original Language</p>
              <p className="text-yellow-600">{movieInfo.originalLang}</p>
            </div>
            <div>
              <p className="font-semibold">Budget</p>
              <p className="text-yellow-600">{movieInfo.budget}</p>
            </div>
            <div>
              <p className="font-semibold">Revenue</p>
              <p className="text-yellow-600">{movieInfo.revenue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
