"use client";
import React, { useState } from "react";
import SeatMap from "./SeatMap";
import { MovieItem } from "@/types";
import rupiahConverter from "@/helpers/rupiahConverter";
import { useUser } from "@clerk/nextjs";

const SeatBooker = ({ movie }: { movie: MovieItem }) => {
  const [selected, setSelected] = useState<number[]>([]);
  // const {user} = useUser()

  return (
    <>
      <div className="max-w-xl m-6 p-2 mx-auto ">
        <div className="bg-gray-900 w-full p-2 rounded mb-4 flex items-center justify-center font-medium">
          Screen Here
        </div>
        <SeatMap selected={selected} setSelected={setSelected} />
      </div>
      <div className="bg-gray-950 p-4 sticky bottom-0 opacity-90">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <div className="flex flex-col gap-2 font-medium">
            <h5 className="text-sm">Seat: {selected.length === 0 ? "-" : selected.join(", ")}</h5>
            <h5 className="text-lg">
              Total: {rupiahConverter(selected.length * movie.ticket_price)}
            </h5>
          </div>
          <button className="btn-primary text-sm">Continue</button>
        </div>
      </div>
    </>
  );
};

export default SeatBooker;
