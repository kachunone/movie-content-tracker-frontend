import React from "react";
import Image from "next/image";

interface CreditsCardProps {
  id: number;
  name: string;
  character: string;
  profilePath: string;
}

export default function CreditsCard(props: CreditsCardProps) {
  return (
    <div className="group mr-1 ml-1 rounded-md flex flex-col cursor-pointer outline-none w-auto h-auto bg-black bg-opacity-50 p-1">
      <Image
        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.profilePath}`}
        alt="Picture of the author"
        width={150}
        height={225}
        style={{ maxWidth: "auto", maxHeight: "auto" }}
        className="rounded w-auto h-auto"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        placeholder="blur"
      />
      <div className="w-[120px]">
        <p className="group-hover:text-white text-sm text-yellow-500 truncate ... transition-colors duration-300">
          {props.name}
        </p>
        <p className="group-hover:text-white text-xs text-yellow-600 truncate ... transition-colors duration-300">
          {props.character ? props.character : "unknown"}
        </p>
      </div>
    </div>
  );
}
