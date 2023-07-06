"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Seat from "./Seat";
import { generateSeatData } from "@/helpers/generateSeatData";

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
