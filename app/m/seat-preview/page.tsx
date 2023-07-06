"use client";
import Seat from "@/components/Seat";
import SeatMap from "@/components/SeatMap";
import PlainNavbar from "@/components/layouts/PlainNavbar";
import { generateSeatPreviewData } from "@/helpers/generateSeatPreviewData";
import { useSearchParams } from "next/navigation";
import React from "react";

const SeatPreviewPage = () => {
  const searchParams = useSearchParams();
  const seat = searchParams.get("seat");
  const generatedSeat = generateSeatPreviewData({
    seats: seat ? seat.split(",") : [],
  });

  const emptyFunction: (id: number) => void = (id) => {};

  return (
    <div>
      <PlainNavbar title="Seat Preview" />

      <div className="max-w-xl m-6 p-2 mx-auto ">
        <div className="grid grid-cols-8 w-full items-center justify-center  gap-x-0 gap-y-2">
          {generatedSeat.map((seat) => (
            <Seat
              clickHandler={emptyFunction}
              seat={seat}
              selected={[]}
              key={seat.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatPreviewPage;
