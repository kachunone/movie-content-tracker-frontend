import React from "react";

const Carousel: React.FC<any> = ({
  children,
  title,
}: {
  children: any;
  title: string;
}) => {
  return (
    <div className="flex flex-col items-center p-3">
      <h6 className="text-yellow-500 text-2xl mb-2 font-semibold ">{title}</h6>
      <div className="flex overflow-auto max-w-[70vw] h-full scrollbar-thin scrollbar-track-myBlueLight scrollbar-thumb-yellow-500 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Carousel;
