import React from "react";
import Image from "next/image";
import img from "@/public/sea-empty.svg";

const PageLoadingUi = () => {
  return (
    <div className="text-2xl text-center raleway animate-pulse font-semibold w-screen h-screen  items-center flex flex-col justify-center">
      <Image
        src={img}
        width={1200}
        height={1200}
        alt="empty image holder"
        className="w-80"
      />
      <h1>Loading nih, santai dulu gak sih 😅☝️...</h1>
    </div>
  );
};

export default PageLoadingUi;
