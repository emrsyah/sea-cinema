import supabase from "@/lib/supabase/supabase";
import { useMutation } from "@tanstack/react-query";

async function subtractBalance(amount: number, userId: string) {
  const { data: balance } = await supabase
    .from("balance")
    .select("*")
    .eq("userId", userId)
    .single();
  if(!balance) return
  const { data, error } = await supabase
    .from("balance")
    .update({
      amount: balance.amount - amount,
    })
    .eq("userId", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const useSubtractbalance = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: ({ amount, userId }: { amount: number; userId: string }) =>
      subtractBalance(amount, userId),
    onSuccess: (data) => {
      if(onSuccess) onSuccess();
    },
    onError: (err) => {
      if(onError) onError();
    },
  });
};
