import React from "react";

interface backdropProps {
  onClick: () => void;
}

export default function Backdrop(props: backdropProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-75 z-40"
      onClick={props.onClick}
    ></div>
  );
}
