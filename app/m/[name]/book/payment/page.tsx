import { getTicket } from "@/app/_actions/ticket";
import MovieCheckoutInfo from "@/components/MovieCheckoutInfo";
import rupiahConverter from "@/helpers/rupiahConverter";
import { MovieItem, TicketCheckoutType } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { ArrowLeft } from "react-feather";
import { currentUser } from '@clerk/nextjs';
import PlainNavbar from "@/components/layouts/PlainNavbar";

async function getMovie(name: string): Promise<MovieItem> {
  const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies", {
    next: { revalidate: 0 },
  });
  const resJson = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return resJson.find(
    (movies: MovieItem) => movies.title == decodeURIComponent(name)
  );
}

const PaymentPage = async ({ params }: { params: { name: string } }) => {
  const ticket = await getTicket();
  const movie = await getMovie(params.name);
  const user = await currentUser()
  const ticketParsed: TicketCheckoutType = JSON.parse(ticket as string);

  return (
    <div>
      <PlainNavbar title="Order Summary" />
      <div className="p-2 my-4 w-full">
        <div className="max-w-lg  mx-auto p-4 rounded-md bg-gray-950 flex flex-col gap-2">
          <div className="flex sm:flex-row flex-col gap-2">
            
            <Image
              alt="movie poster"
              src={movie.poster_url}
              width={500}
              height={500}
              className="w-32 rounded"
            />
            <div className="p-2 text-sm w-full flex flex-col gap-1">
              <h5 className="text-xl raleway font-semibold mb-1">
                {movie.title}
              </h5>
              <MovieCheckoutInfo
                content={dayjs(movie.release_date).format("DD MMMM YYYY")}
                title="Release Date"
              />
              <MovieCheckoutInfo
                content={movie.age_rating.toString()}
                title="Age Rating"
              />
              <MovieCheckoutInfo
                content={rupiahConverter(movie.ticket_price)}
                title="Ticket Price"
              />
            </div>
          </div>
          <div className="text-base p-2 sm:p-0 mt-1">
            <MovieCheckoutInfo
              title="Watch Date"
              content={dayjs(ticketParsed.date).format("DD MMMM")}
            />
            <MovieCheckoutInfo
              title="Seat"
              content={ticketParsed.seat.join(",  ")}
            />
            <MovieCheckoutInfo
              title="Total"
              content={rupiahConverter(
                ticketParsed.seat.length * movie.ticket_price
              )}
            />
            <div className="p-2 rounded mt-1 text-sm font-medium bg-gray-900">
              <span className="text-xl">💡</span>{" "}
              Your Balance: Rp 250.000
            </div>
            <button className="btn-primary mt-3 w-full">Confirm Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
