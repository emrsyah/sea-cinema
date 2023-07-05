import SeatBooker from "@/components/SeatBooker";
import BookingNavbar from "@/components/layouts/BookingNavbar";
import { extractMovieTitle } from "@/helpers/extractMovieTitle";
import { MovieItem } from "@/types";
import React from "react";

async function getMovie(name: string): Promise<MovieItem> {
  const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies", {
    next: { revalidate: 0 },
  });
  const resJson = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const movieTitle = extractMovieTitle(name)
  return resJson.find(
    (movies: MovieItem) => movies.title == movieTitle
  );
}


const BookingPage = async ({ params }: { params: { name: string } }) => {
  const movie = await getMovie(params.name);
  return (
    <div>
      <BookingNavbar movie={movie} />
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
      <SeatBooker movie={movie} />
    </div>
  );
};

export default BookingPage;
