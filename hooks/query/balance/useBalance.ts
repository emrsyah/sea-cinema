import supabase from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

const getBalance = async (userId: string) => {
    
  let { data: balance, error } = await supabase.from("balance").select("*").eq("userId", userId).single();

  if (error) {
    throw new Error(error.message);
  }
  return balance;
};

export const useBalance = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(userId),
  });
};
