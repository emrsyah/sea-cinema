import rupiahConverter from "@/helpers/rupiahConverter";
import { MovieItem } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({movie}: {movie: MovieItem}) => { 
  const {id, title, description, release_date, poster_url, age_rating, ticket_price} = movie || {}
  const movieTitle = title.includes(".") ? title.split(".").join("(dot)") : title
  return (
    <Link
      href={`/m/${movieTitle}`}
      className="rounded-lg z-0 hover:border-2 hover:border-indigo-600 shadow-lg hover:scale-[102%] transition-all duration-200 ease-out cursor-pointer"
    >
      <div className="w-full relative movie-card">
        <Image
          width={560}
          height={560}
          src={
            poster_url
          }
          className="w-full h-full object-cover rounded-lg"
          alt=""
        />
        <div
          className={`font-semibold flex flex-col gap-1 w-full px-2 raleway pt-16 pb-2 absolute bottom-0  text-white bg-gradient-to-b from-transparent to-black`}
        >
          <h3>{title}</h3>
          <div className="flex items-center gap-2">
            <div className="chip-primary">
              {age_rating}+
            </div>
            <div className="chip-primary">
              {dayjs(release_date).format("MMM YYYY")}
            </div>
          </div>
          <h3 className="mt-1 font-bold text-indigo-500">{rupiahConverter(ticket_price)}</h3>
        </div>
        <div className="movie-description text-sm">{description}</div>
      </div>
    </Link>
  );
};

export default MovieCard;
