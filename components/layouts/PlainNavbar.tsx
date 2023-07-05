"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeft } from "react-feather";

const PlainNavbar = ({url, title} : {url?: string, title: string}) => {
  const router = useRouter()
  const clickHandler = () => {
    if(url){
        router.push(url)
    } else{
        router.back()
    }
  }
  return (
    <nav className="p-4 flex items-center bg-gray-950 border-b-[1.5px] border-b-gray-800">
      <ArrowLeft className="cursor-pointer" onClick={clickHandler} />
      <h3 className="flex-1 raleway font-semibold text-lg flex items-center justify-center">
        {title}
      </h3>
    </nav>
  );
};

export default PlainNavbar;
