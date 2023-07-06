import supabase from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

const getTicket = async (userId: string) => {
    
  let { data: ticket, error } = await supabase.from("ticket").select("*").eq("userId", userId).order("createdAt", {ascending: false});
  if (error) {
    throw new Error(error.message);
  }
  return ticket;
};

export const useTicket = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["ticket"],
    queryFn: () => getTicket(userId),
  });
};
