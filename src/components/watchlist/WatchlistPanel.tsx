"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import MovieBar from "@/components/movies/MovieBar";
import { Movie } from "@mui/icons-material";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { MovieService } from "@/services/Movie";
import { Typography } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  mark: string;
}

export default function WatchlistPanel() {
  const [movieList, setMovieList] = useState<Movie[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [filterBy, setfilterBy] = useState("All");
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value;
    setfilterBy(selectedType);

    if (selectedType === "All") {
      setMovieList(allMovies);
    } else if (selectedType === "Watched") {
      const watchedMovies = allMovies.filter(
        (movie) => movie.mark === "watched"
      );
      setMovieList(watchedMovies);
    } else if (selectedType === "Wish to watch") {
      const wishToWatchMovies = allMovies.filter(
        (movie) => movie.mark === "wish to watch"
      );
      setMovieList(wishToWatchMovies);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const token = getCookie("token");
        const fetchedMovies = await MovieService.getMoviesByUser(
          token as string
        );
        setAllMovies(fetchedMovies);
        setMovieList(fetchedMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const removeMovie = (movieId: number) => {
    let updatedMovieList = movieList!.filter((movie) => movie.id !== movieId);
    setMovieList(updatedMovieList);
    updatedMovieList = allMovies!.filter((movie) => movie.id !== movieId);
    setAllMovies(updatedMovieList);
  };

  return (
    <div className="min-h-screen mt-3 bg-myBlueDark text-white flex flex-col items-center">
      <h6 className="text-yellow-500 text-2xl font-semibold self-center">
        Watch List
      </h6>

      <div className="text-xl w-[700px] max-w-[90vw] my-5 flex flex-col gap-3">
        <div>
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={filterBy}
              onChange={handleChange}
              input={<BootstrapInput />}
              MenuProps={{
                sx: {
                  ".MuiPaper-root": {
                    backgroundColor: "#12161E",
                    color: "#FFDB0E",
                    mt: 0.5,
                  },
                  ".Mui-selected": {
                    backgroundColor: "#EAB306",
                    color: "#201F28",
                  },
                  ".MuiMenuItem-root:hover": {
                    backgroundColor: "#EAB306",
                    color: "#201F28",
                  },
                },
              }}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Watched"}>Watched</MenuItem>
              <MenuItem value={"Wish to watch"}>Wish to watch</MenuItem>
            </Select>
          </FormControl>
        </div>
        {isLoading && <LoadingIndicator />}
        {Array.isArray(movieList) && movieList.length === 0 && (
          <NoMoviesMessage />
        )}
        {Array.isArray(movieList) &&
          movieList.map((movie: Movie) => {
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

function LoadingIndicator() {
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 5,
    borderRadius: 2,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#C22D2E",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 2,
      backgroundColor: "#FFDB0E",
    },
  }));
  return (
    <Box sx={{ width: "100%" }}>
      <BorderLinearProgress />
    </Box>
  );
}

function NoMoviesMessage() {
  return (
    <Typography
      variant="h6"
      className="text-yellow-600 self-center text-center h-[100vh] bg-black rounded-md p-2 bg-opacity-40 text-4xl w-full"
    >
      No movies added
    </Typography>
  );
}

const BootstrapInput = styled(InputBase)(() => ({
  "& .MuiInputBase-input": {
    borderRadius: 6,
    position: "relative",
    backgroundColor: "#12161E",
    border: "none",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
  },
  "& .MuiSelect-icon": {
    color: "#FFDB0E",
  },
  "& .MuiSelect-select": {
    color: "#FFDB0E",
  },
}));
