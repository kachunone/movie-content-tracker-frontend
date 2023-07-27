import React from "react";
import { cookies } from "next/headers";

async function getMovies(token?: string) {
  const res = await fetch("http://localhost:3001/user/movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const movies = await res.json();
  return movies;
}

export default async function WatchList() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const movies = await getMovies(token?.value);

  return (
    <div className="h-screen min-h-screen mt-16 bg-red-900 text-white flex flex-col justify-center items-center text-4xl"></div>
  );
}
