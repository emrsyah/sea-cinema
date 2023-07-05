import supabase from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

const getTicket = async (userId: string) => {
    
  let { data: balance, error } = await supabase.from("balance").select("*").eq("userId", userId).single();

  if (error) {
    throw new Error(error.message);
  }
  return balance;
};

export const useTicket = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["ticket"],
    queryFn: () => getTicket(userId),
  });
};
