import MovieDetailInfo from "@/components/MovieDetailInfo";
import Navbar from "@/components/Navbar";
import rupiahConverter from "@/helpers/rupiahConverter";
import { MovieItem } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import TicketBooker from "@/components/TicketBooker";

async function getMovie(name: string): Promise<MovieItem> {
  const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies", {
    next: { revalidate: 0 },
  });
  const resJson = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // console.log(resJson)
  return resJson.find(
    (movies: MovieItem) => movies.title == decodeURIComponent(name)
  );
}

const MovieDetail = async ({ params }: { params: { name: string } }) => {
  const movie = await getMovie(params.name);

  return (
    <>
      <Navbar />
      <div className="  w-full flex items-center justify-center">
        <main className="max-w-5xl my-6 mx-12 gap-6 grid grid-cols-3">
          <div className="col-span-3 md:col-span-1">
            <Image
              src={movie.poster_url}
              alt="movie poster"
              width={560}
              height={560}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="col-span-3 md:col-span-2 my-3 md:w-11/12 flex flex-col gap-6">
            <div className="flex flex-col gap-3 flex-1">
              <h1 className="raleway text-4xl md:text-5xl font-bold">{movie.title}</h1>
              <div className="flex items-center gap-2">
                <MovieDetailInfo
                  content={dayjs(movie.release_date).format("MMM YYYY")}
                  type="rd"
                />
                  <span className="text-indigo-800">|</span>
                <MovieDetailInfo
                  content={`Age ${movie.age_rating}+`}
                  type="ag"
                />
                  <span className="text-indigo-800">|</span>
                <MovieDetailInfo
                  content={rupiahConverter(movie.ticket_price)}
                  type="pr"
                />
               
              </div>
              <p className="text-gray-300 ">{movie.description}</p>
            </div>
          </div>
          <div className="col-span-3">
            <div className="p-2 border-2 bg-opacity-50 border-indigo-800  font-semibold raleway flex items-center bg-indigo-500 rounded-md"><span className="text-2xl">💡</span> Choose your days and Please watch according your age, thank you</div>
            <TicketBooker />
          </div>
        </main>
      </div>
    </>
  );
};

export default MovieDetail;
