"use client";
import { SeatType } from "@/types";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Seat from "./Seat";
import { generateSeatData } from "@/helpers/generateSeatData";


const seatData: SeatType[] = [
  {
    id: 1,
    status: "available",
  },
  {
    id: 2,
    status: "available",
  },
  {
    id: 3,
    status: "taken",
  },
  {
    id: 4,
    status: "taken",
  },
  {
    id: 5,
    status: "available",
  },
  {
    id: 6,
    status: "available",
  },
  {
    id: 7,
    status: "available",
  },
  {
    id: 8,
    status: "available",
  },
  {
    id: 9,
    status: "taken",
  },
  {
    id: 10,
    status: "available",
  },
  {
    id: 11,
    status: "available",
  },
  {
    id: 12,
    status: "available",
  },
  {
    id: 13,
    status: "available",
  },
  {
    id: 14,
    status: "taken",
  },
  {
    id: 15,
    status: "taken",
  },
  {
    id: 16,
    status: "available",
  },
  {
    id: 17,
    status: "available",
  },
  {
    id: 18,
    status: "available",
  },
  {
    id: 19,
    status: "taken",
  },
  {
    id: 20,
    status: "available",
  },
  {
    id: 21,
    status: "available",
  },
  {
    id: 22,
    status: "available",
  },
  {
    id: 23,
    status: "taken",
  },
  {
    id: 24,
    status: "available",
  },
  {
    id: 25,
    status: "available",
  },
  {
    id: 26,
    status: "available",
  },
  {
    id: 27,
    status: "available",
  },
  {
    id: 28,
    status: "available",
  },
  {
    id: 29,
    status: "taken",
  },
  {
    id: 30,
    status: "available",
  },
  {
    id: 31,
    status: "taken",
  },
  {
    id: 32,
    status: "available",
  },
  {
    id: 33,
    status: "available",
  },
  {
    id: 34,
    status: "available",
  },
  {
    id: 35,
    status: "available",
  },
  {
    id: 36,
    status: "taken",
  },
  {
    id: 37,
    status: "available",
  },
  {
    id: 38,
    status: "available",
  },
  {
    id: 39,
    status: "available",
  },
  {
    id: 40,
    status: "available",
  },
  {
    id: 41,
    status: "taken",
  },
  {
    id: 42,
    status: "available",
  },
  {
    id: 43,
    status: "available",
  },
  {
    id: 44,
    status: "taken",
  },
  {
    id: 45,
    status: "available",
  },
  {
    id: 46,
    status: "available",
  },
  {
    id: 47,
    status: "taken",
  },
  {
    id: 48,
    status: "available",
  },
  {
    id: 49,
    status: "taken",
  },
  {
    id: 50,
    status: "available",
  },
  {
    id: 51,
    status: "available",
  },
  {
    id: 52,
    status: "taken",
  },
  {
    id: 53,
    status: "available",
  },
  {
    id: 54,
    status: "available",
  },
  {
    id: 55,
    status: "taken",
  },
  {
    id: 56,
    status: "available",
  },
  {
    id: 57,
    status: "available",
  },
  {
    id: 58,
    status: "taken",
  },
  {
    id: 59,
    status: "available",
  },
  {
    id: 60,
    status: "taken",
  },
  {
    id: 61,
    status: "available",
  },
  {
    id: 62,
    status: "available",
  },
  {
    id: 63,
    status: "available",
  },
  {
    id: 64,
    status: "available",
  },
];

const SeatMap = ({selected, setSelected, bookedSeat} : {selected: number[], setSelected: React.Dispatch<React.SetStateAction<number[]>>, bookedSeat: any}) => {
  const seatTransformed = (generateSeatData({bookedSeat: bookedSeat}))

  const seatClickHandler = (id: number) => {
    if (seatTransformed[id - 1].status === "taken") return;
    if (selected.includes(id)) {
      const updatedSeat = selected.filter((n) => n !== id);
      setSelected(updatedSeat);
      return;
    }
    if (selected.length === 6) {
      toast.error("Max 6 ticket", {autoClose: 1500})
      return
    }
    setSelected((prev) => [...prev, id]);
  };

  return (
    <div className="grid grid-cols-8 w-full items-center justify-center  gap-x-0 gap-y-2">
      {seatTransformed.map((seat) => (
        <Seat clickHandler={seatClickHandler} seat={seat} selected={selected} key={seat.id} />
      ))}
    </div>
  );
};

export default SeatMap;
