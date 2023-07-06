"use client";
import { SeatType } from "@/types";
import React from "react";

const Seat = ({ seat, clickHandler, selected }: { seat: SeatType, clickHandler: (id: number) => void, selected: number[] }) => {
  return (
    <div
      key={seat.id}
      className={`col-span-1  flex items-center justify-center w-full p-1 `}
    >
      <div
        onClick={() => clickHandler(seat.id)}
        className={`w-10 h-10 flex items-center justify-center rounded-md ${
          (selected.includes(seat.id) || seat.status === "selected")
            ? "bg-indigo-500 cursor-pointer hover:bg-indigo-700"
            : seat.status === "available"
            ? "bg-gray-900 cursor-pointer hover:bg-gray-950 hover:text-indigo-500"
            : seat.status === "taken"
            ? "bg-gray-400 text-gray-300"
            : null
        }`}
      >
        {seat.id}
      </div>
    </div>
  );
};

export default Seat;
