"use client";
import rupiahConverter from "@/helpers/rupiahConverter";
import { MovieItem } from "@/types";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { ArrowLeft } from "react-feather";

const BookingNavbar = ({ movie }: { movie: MovieItem }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const date = searchParams.get('date')

  const backArrowHandler = () => {
    const movieTitle = movie.title.includes(".") ? movie.title.split(".").join("(dot)") : movie.title
    router.push(`/m/${movieTitle}`)
  };

  return (
    <nav className="bg-gray-950 flex items-center justify-between p-4 border-b-[1.5px] border-b-gray-800">
      <button onClick={backArrowHandler} className="text-gray-400 hover:text-white">
        <ArrowLeft />
      </button>
      <h3 className="font-semibold flex-1 text-lg raleway text-center items-center">
        {decodeURIComponent(movie.title)}
      </h3>
      <div className="flex items-center gap-1">
        <p className="chip-primary font-medium">
          {dayjs(date).format("DD MMMM")}
        </p>
        <p className="chip-primary font-medium">
          {rupiahConverter(movie.ticket_price)}
        </p>
      </div>
    </nav>
  );
};

export default BookingNavbar;
