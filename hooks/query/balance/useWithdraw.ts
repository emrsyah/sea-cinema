import supabase from "@/lib/supabase/supabase";
import { useMutation } from "@tanstack/react-query";

async function withdrawBalance(amount: number, userId: string) {
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

export const useWithdraw = ({
  onSuccess,
  onError,
}: {
  onSuccess?: any;
  onError?: any;
}) => {
  return useMutation({
    mutationFn: ({ amount, userId }: { amount: number; userId: string }) =>
      withdrawBalance(amount, userId),
    onSuccess: (data) => {
      onSuccess();
    },
    onError: (err) => {
      onError();
    },
  });
};
