import React from "react";
import CreditsCard from "./CreditsCard";

interface Credit {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

interface CreditsListProps {
  movieId: number;
}

async function getCredits(id: number) {
  const my_api = process.env.NEXT_PUBLIC_MOVIES_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${my_api}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch credits");
  }

  const jsonData = await res.json();
  const creditsList = jsonData["cast"]
    .filter((item: Credit) => item.profile_path !== null)
    .map((item: Credit) => (
      <div key={item.id} style={{ width: 150 }}>
        <CreditsCard
          id={item.id}
          name={item.name}
          character={item.character}
          profilePath={item.profile_path}
        ></CreditsCard>
      </div>
    ));

  return creditsList;
}

export default async function CreditsList(props: CreditsListProps) {
  const credits = await getCredits(props.movieId);

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <h6 className="text-yellow-500 text-2xl mb-2 font-semibold">Credits</h6>
      <div className="flex items-center overflow-auto max-w-[75vw] scrollbar-thin scrollbar-track-myBlueLight scrollbar-thumb-yellow-500 rounded-md pb-3 mb-10">
        {credits}
      </div>
    </div>
  );
}
