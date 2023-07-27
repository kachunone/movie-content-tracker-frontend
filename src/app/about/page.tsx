import React from "react";
import { cookies } from "next/headers";

async function getProfile(token?: string) {
  const res = await fetch("http://localhost:3001/auth/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const profile = await res.json();
  return profile;
}

export default async function About() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const profile = await getProfile(token?.value);

  return (
    <div className="h-screen min-h-screen mt-16 bg-red-900 text-white flex flex-col justify-center items-center text-4xl">
      <p>{profile.sub}</p>
      <p>{profile.username}</p>
      <p>{profile.iat}</p>
      <p>{profile.exp}</p>
    </div>
  );
}
