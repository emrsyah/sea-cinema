import SeatMap from "@/components/SeatMap";
import React from "react";
import { ArrowLeft } from "react-feather";

const BookingPage = () => {
  return (
    <div>
      <nav className="bg-gray-950 flex items-center justify-between p-4 border-b-[1.5px] border-b-gray-800">
        <ArrowLeft className="" />
        <h3 className="font-semibold flex-1 text-lg raleway text-center items-center">
          Avatar The Way of Water
        </h3>
        <div className="flex items-center gap-1">
          <p className="chip-primary font-medium">01 July</p>
          <p className="chip-primary font-medium">Rp 20.000</p>
        </div>
      </nav>
      <div className="px-4 py-2 border-b-[1.5px] border-b-gray-800 grid grid-cols-3">
        <div className="flex justify-center items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
          Tersedia
        </div>
        <div className="flex justify-center items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
          Tidak Tersedia
        </div>
        <div className="flex justify-center items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-indigo-600 rounded-sm"></div>
          Pilihanmu
        </div>
      </div>
      <div className="max-w-xl m-6 p-2 mx-auto ">
        <div className="bg-gray-900 w-full p-2 rounded mb-4 flex items-center justify-center font-medium">Screen Here</div>
        <SeatMap />
      </div>
    </div>
  );
};

export default BookingPage;
