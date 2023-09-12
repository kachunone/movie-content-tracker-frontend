import React from "react";
import Image, { StaticImageData } from "next/image";
import { CircularProgress } from "@mui/material";

import NoneImage from "../../../../public/peakpx.jpg";
import MovieOptBtn from "@/components/movies/MovieOptbtn";
import CreditsList from "@/components/credits/CreditsList";
import { VideoView } from "@/components/Trailer/VideoView";

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
  poster: string | StaticImageData;
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

interface MovieOptBtnProps {
  movieId: number;
  poster: string | StaticImageData;
  title: string;
  releaseDate: string;
  overview: string;
  mark: string;
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

async function getVideoId(movieId: number) {
  const moviesAPI = process.env.NEXT_PUBLIC_MOVIES_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${moviesAPI}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }

  let firstTeaserKey = "";

  const videos = await res.json();
  for (const video of videos["results"]) {
    if (video.site === "YouTube") {
      if (video.type === "Trailer") {
        return video.key;
      } else if (video.type === "Teaser" && !firstTeaserKey) {
        firstTeaserKey = video.key;
      }
    }
  }
  return firstTeaserKey;
}

export default async function Page({ params }: { params: { id: number } }) {
  const movie = await getMovie(params.id);
  const videoId = await getVideoId(params.id);

  const movieInfo: MovieInfo = {
    poster:
      movie["poster_path"] !== null
        ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie["poster_path"]}`
        : NoneImage,
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
    originalLang: movie["spoken_languages"][0]?.english_name || "Unknown",
    budget: movie["budget"] ? formatCurrency(movie["budget"]) : "N/A",
    revenue: movie["revenue"] ? formatCurrency(movie["revenue"]) : "N/A",
  };

  const btnInfo: MovieOptBtnProps = {
    movieId: params.id,
    poster: movieInfo.poster,
    title: movieInfo.title,
    releaseDate: movieInfo.releaseDate,
    overview: movieInfo.overview,
    mark: "watched",
  };

  return (
    <div className="min-h-screen bg-myBlueDark">
      <div
        style={{
          backgroundImage: `url(${movieInfo.poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative flex flex-col items-center justify-center sm:flex-row bg-opacity-60 bg-black backdrop-blur-xl">
          <Image
            src={movieInfo.poster}
            alt="Picture of the author"
            width={260}
            height={390}
            style={{ minWidth: "auto", minHeight: "auto" }}
            className="rounded-lg m-6"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            placeholder="blur"
          />
          <div className=" h-full flex flex-col justify-center items-center text-center text-yellow-400 sm:items-start sm:text-left">
            <div className="m-2">
              <h5 className="text-2xl font-bold">
                {movieInfo.title}{" "}
                <span className=" text-yellow-600">
                  {movieInfo.releaseYear}
                </span>
              </h5>
              <p className=" text-yellow-600">
                {movieInfo.releaseDate}{" "}
                <span className=" font-extrabold">·</span> {movieInfo.genres}{" "}
                <span className=" font-extrabold">·</span> {movieInfo.runtime}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 m-2 items-center justify-center">
              <div className="flex items-center gap-1">
                <div className="group relative inline-grid hover:scale-150 transition duration-300 ">
                  <CircularProgress
                    variant="determinate"
                    value={movieInfo.voteAvg}
                    className=" bg-myBlueDark rounded-full text-blue-500 group-hover:text-yellow-500 transition-colors duration-300"
                    size={"4rem"}
                  />
                  <div className="text-blue-500 group-hover:text-yellow-500 transition duration-300 font-bold text-lg absolute top-0 right-0 left-0 bottom-0 grid justify-center items-center">
                    {`${movieInfo.voteAvg}%`}
                  </div>
                </div>
                <p className=" leading-4 font-semibold">
                  User <br />
                  Score
                </p>
              </div>
              <MovieOptBtn data={btnInfo}></MovieOptBtn>
              <div className="flex flex-row items-center rounded-md gap-2">
                <VideoView videoId={videoId} />
              </div>
            </div>
            <p className="m-2 text-yellow-600 italic">{movieInfo.tagline}</p>
            <div className="m-2">
              <p className="mb-1 font-semibold">Overview</p>
              <p className="leading-4 text-sm max-w-3xl text-yellow-600">
                {movieInfo.overview}
              </p>
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
      <CreditsList movieId={params.id} />
    </div>
  );
}
