"use client";
import React, { useEffect, useState, useTransition } from "react";
import SeatMap from "./SeatMap";
import { MovieItem } from "@/types";
import rupiahConverter from "@/helpers/rupiahConverter";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { addTicket } from "@/app/_actions/ticket";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabase/supabase";
import dayjs from "dayjs";
import { useSeat } from "@/hooks/query/useSeat";

const SeatBooker = ({ movie }: { movie: MovieItem }) => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const router = useRouter();
  const pathname = usePathname();

  const [selected, setSelected] = useState<number[]>([]);

  const { user, isLoaded } = useUser();
  const [isPending, startTransition] = useTransition();
  const { data: seat } = useSeat({
    movieName: movie.title,
    playDate: date ? date : "",
  });

  const CustomToast = () => (
    <div>
      Changes occurs,{" "}
      <button
        onClick={() => router.refresh()}
        className="text-indigo-500 underline hover:text-indigo-600"
      >
        see latest update
      </button>
    </div>
  );

  const bookClickHandler = () => {
    if (!isLoaded) return;
    if (selected.length === 0) {
      toast.info(`Please select seat first`, { autoClose: 3000 });
      return;
    }
    if ((user?.unsafeMetadata.age as number) < movie.age_rating) {
      toast.error(`Sorry, you're not old enough for the movie`, {
        autoClose: 3000,
      });
      return;
    }
    startTransition(() => addTicket({ seat: selected, date: date as string }));
    router.push(`${pathname}/payment`);
  };

  useEffect(() => {
    // Realtime seat update
    const channel = supabase
      .channel("ticket-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ticket",
          filter: `movieName=eq.${movie.title}`,
        },
        (payload) => {
          if (dayjs(payload.new.playDate).format("YYYY-MM-DD") === date) {
            toast.info(CustomToast);
            console.log("Change received!", payload);
          }
        }
      )
      .subscribe();

    // clean up
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


  return (
    <>
      <div className="max-w-xl m-6 p-2 mx-auto ">
        <div className="bg-gray-900 w-full p-2 rounded mb-4 flex items-center justify-center font-medium">
          Screen Here
        </div>
        <SeatMap selected={selected} setSelected={setSelected} bookedSeat={seat} />
      </div>
      <div className="bg-gray-950 p-4 sticky bottom-0 opacity-90">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <div className="flex flex-col gap-2 font-medium">
            <h5 className="text-sm">
              Seat: {selected.length === 0 ? "-" : selected.join(", ")}
            </h5>
            <h5 className="text-lg">
              Total: {rupiahConverter(selected.length * movie.ticket_price)}
            </h5>
          </div>
          <button onClick={bookClickHandler} className="btn-primary text-sm">
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default SeatBooker;
