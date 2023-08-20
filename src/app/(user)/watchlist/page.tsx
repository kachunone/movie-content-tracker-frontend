import React from "react";
import WatchlistPanel from "@/components/watchlist/WatchlistPanel";

export default async function Watchlist() {
  return (
    <div className="min-h-screen mt-16 bg-myBlueDark text-white flex flex-col items-center">
      <WatchlistPanel />
    </div>
  );
}
