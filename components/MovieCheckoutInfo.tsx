import React from "react";

const MovieCheckoutInfo = ({title, content} : {title: string, content: string}) => {
  return (
    <div className="flex border-t-[1px] border-dotted border-t-gray-900 py-2 items-center justify-between w-full">
      <p className="text-gray-300">{title}:</p>
      <h5 className="font-medium">
        {content}
      </h5>
    </div>
  );
};

export default MovieCheckoutInfo;
