import supabase from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

const getBalance = async (userId: string) => {
  let { data: balance, error } = await supabase
    .from("balance")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message);
  }
  return balance?.length ? balance[0] : { amount: 0 };
};

export const useBalance = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(userId),
  });
};
