import React from "react";
import { cookies } from "next/headers";

export default function About() {
  return (
    <div className="min-h-screen mt-16 bg-myBlueDark flex flex-col justify-center items-center text-4xl ">
      <div className="bg-black rounded-lg bg-opacity-40 min-h-screen py-8 m-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4 text-center text-yellow-500">
            About Movie Content Tracker
          </h1>
          <p className="mb-6 text-center text-yellow-600 text-lg">
            Welcome to Movie Content Tracker, your go-to app for organizing and
            managing your movie watchlist!
          </p>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-yellow-500">
              Features
            </h2>
            <ul className="list-disc list-inside">
              <li className="text-yellow-600 mb-2 text-lg">
                Search and browse a vast collection of movies.
              </li>
              <li className="text-yellow-600 mb-2 text-lg">
                Add movies to your personal watchlist for future reference.
              </li>
              <li className="text-yellow-600 mb-2 text-lg">
                Mark watched movies and keep track of what you&apos; ve seen.
              </li>
              <li className="text-yellow-600 mb-2 text-lg">
                Customize your watchlist with notes and ratings for each movie.
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-yellow-500">
              Why Use Movie Content Tracker?
            </h2>
            <p className="text-yellow-600 text-lg">
              With Movie Content Tracker, you can easily keep track of movies
              you want to watch or have already watched. Say goodbye to
              forgetting movie recommendations and hello to an organized
              movie-watching experience!
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-yellow-500">
              Get Started
            </h2>
            <p className="text-yellow-600 text-lg">
              To access personalized features, sign up for a free account. It
              only takes a minute!
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-yellow-500">
              Contact me
            </h2>
            <p className="text-yellow-600 text-lg">
              If you have any questions or feedback, feel free to contact me.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
