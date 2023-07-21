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

  return res.json();
}

export default async function CreditsList(props: CreditsListProps) {
  const credits = await getCredits(props.movieId);
  const creditsList = credits["cast"]
    .filter((item: Credit) => item.profile_path !== null)
    .map((item: Credit) => (
      <CreditsCard
        key={item.id}
        id={item.id}
        name={item.name}
        character={item.character}
        profilePath={item.profile_path}
      ></CreditsCard>
    ));

  return creditsList;
}
