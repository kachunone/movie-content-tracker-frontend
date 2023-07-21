"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel: React.FC<any> = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col items-center p-3">
      <h6 className="text-yellow-500 text-2xl mb-2 font-semibold ">Credits</h6>
      <div className="flex overflow-auto w-[70vw] h-full scrollbar-thin scrollbar-thumb-myBlueLight scrollbar-track-yellow-500 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Carousel;
