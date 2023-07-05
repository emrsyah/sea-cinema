import { getTicket } from "@/app/_actions/ticket";
import MovieCheckoutInfo from "@/components/MovieCheckoutInfo";
import rupiahConverter from "@/helpers/rupiahConverter";
import { MovieItem, RequiredTicketParamsType, TicketCheckoutType } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { currentUser } from '@clerk/nextjs';
import PlainNavbar from "@/components/layouts/PlainNavbar";
import BalancePayment from "@/components/BalancePayment";

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
  
  const tickerParams: RequiredTicketParamsType = {
    movieName: movie.title,
    amount: ticketParsed.seat.length,
    playDate: new Date(ticketParsed.date),
    price: movie.ticket_price,
    seat: ticketParsed.seat,
    userId: user? user.id : ""
  }

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
            <BalancePayment userId={user ? user.id : ""} ticket={tickerParams} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
