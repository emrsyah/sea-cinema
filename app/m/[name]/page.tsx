import MovieDetailInfo from "@/components/MovieDetailInfo";
import rupiahConverter from "@/helpers/rupiahConverter";
import { MovieItem } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import TicketBooker from "@/components/headless-ui/TicketBooker";
import Navbar from "@/components/layouts/Navbar";
import { currentUser } from "@clerk/nextjs";
import { extractMovieTitle } from "@/helpers/extractMovieTitle";
import MovieCard from "@/components/MovieCard";
import SynopsisReviewTabs from "@/components/headless-ui/SynopsisReviewTabs";

async function getMovie(
  name: string
): Promise<{ requestedMovie: MovieItem; randomMovies: MovieItem[] }> {
  const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies");
  const allMovies = await res.json();
  const movieTitle = extractMovieTitle(name);

  const requestedMovie = allMovies.find(
    (movie: MovieItem) => movie.title == movieTitle
  );
  const randomMovies: MovieItem[] = [];
  while (randomMovies.length < 4) {
    const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];
    if (
      randomMovie != requestedMovie &&
      !randomMovies.some((m) => m.id === randomMovie.id)
    )
      randomMovies.push(randomMovie);
  }

  return {
    requestedMovie,
    randomMovies,
  };
}

const MovieDetail = async ({ params }: { params: { name: string } }) => {
  const user = await currentUser();
  const { requestedMovie, randomMovies } = await getMovie(params.name);

  return (
    <>
      <Navbar
        userId={user ? user.id : ""}
        username={user ? user.username! : ""}
        age={user ? (user.unsafeMetadata.age as number) : 0}
      />
      <div className="w-full flex items-center justify-center">
        <main className="max-w-5xl my-6 mx-12 gap-6 grid grid-cols-3">
          <div className="col-span-3 md:col-span-1">
            <Image
              src={requestedMovie.poster_url}
              alt="movie poster"
              width={560}
              height={560}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="col-span-3 md:col-span-2 my-3 md:w-11/12 flex flex-col gap-6">
            <div className="flex flex-col gap-3 flex-1">
              <h1 className="raleway text-4xl md:text-5xl font-bold">
                {requestedMovie.title}
              </h1>
              <div className="flex items-center gap-2">
                <MovieDetailInfo
                  content={dayjs(requestedMovie.release_date).format(
                    "MMM YYYY"
                  )}
                  type="rd"
                />
                <span className="text-indigo-800">|</span>
                <MovieDetailInfo
                  content={`Age ${requestedMovie.age_rating}+`}
                  type="ag"
                />
                <span className="text-indigo-800">|</span>
                <MovieDetailInfo
                  content={rupiahConverter(requestedMovie.ticket_price)}
                  type="pr"
                />
              </div>
              <SynopsisReviewTabs synopsis={requestedMovie.description} movieName={requestedMovie.title} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="p-2 border-2 bg-opacity-50 border-indigo-800  font-semibold raleway flex items-center bg-indigo-500 rounded-md">
              <span className="text-2xl">💡</span> Choose your days and Please
              watch according your age, thank you
            </div>
            <TicketBooker />
          </div>
          <div className="border-t-[1.5px] border-t-gray-800 py-4 w-full col-span-3">
            <h3 className="font-semibold text-2xl raleway">
              Check Another Movies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-3">
              {randomMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.title} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MovieDetail;
