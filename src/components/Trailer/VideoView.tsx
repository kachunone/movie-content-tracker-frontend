"use client";

import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface VideoViewProps {
  videoId: number;
}

export function VideoView(props: VideoViewProps) {
  const [openVideo, setOpenVideo] = useState(false);
  const handleOpenVideo = () => setOpenVideo(true);
  const handleCloseVideo = () => setOpenVideo(false);

  return (
    <>
      <PlayArrowIcon
        className="hover:text-red-900 text-red-500 p-2 cursor-pointer rounded-full bg-myBlueDark transition-colors duration-300"
        style={{ width: "2.5rem", height: "2.5rem" }}
        onClick={handleOpenVideo}
      ></PlayArrowIcon>
      <p className=" text-yellow-500">Play Trailer</p>
      <Modal open={openVideo} onClose={handleCloseVideo}>
        <div className="absolute outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <iframe
            src={`https://www.youtube.com/embed/${props.videoId}`}
            className="w-[90vw] aspect-[16/10] md:w-[690px] rounded-lg"
          />
        </div>
      </Modal>
    </>
  );
}
