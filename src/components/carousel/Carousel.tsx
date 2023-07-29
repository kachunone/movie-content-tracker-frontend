import React from "react";

interface CarouselProps {
  children: React.JSX.Element;
  title: string;
}

export default function Carousel(props: CarouselProps) {
  return (
    <div className="flex flex-col items-center justify-center p-3">
      <h6 className="text-yellow-500 text-2xl mb-2 font-semibold ">
        {props.title}
      </h6>
      <div className="pb-4 flex items-center justify-center overflow-auto w-[900px] max-w-[85vw] h-full scrollbar-thin scrollbar-track-myBlueLight scrollbar-thumb-yellow-500 rounded-md">
        {props.children}
      </div>
    </div>
  );
}
