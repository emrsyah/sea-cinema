import supabase from "@/lib/supabase/supabase";
import { TicketType } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getSeat = async (movieName: string, playDate: string) => {
    
  let { data: seat, error } = await supabase.from("ticket").select("seat").eq("movieName", movieName).eq("status", "success").eq("playDate", playDate);
  if (error) {
    throw new Error(error.message);
  }
  return seat;
};

export const useSeat = ({ movieName, playDate }: { movieName: string, playDate: string }) => {
  return useQuery({
    queryKey: ["seat"],
    queryFn: () => getSeat(movieName, playDate),
  });
};
