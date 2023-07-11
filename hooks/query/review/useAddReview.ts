import supabase from "@/lib/supabase/supabase";
import { RequiredTicketParamsType } from "@/types";
import { useMutation } from "@tanstack/react-query";

async function addReview(ticket: RequiredTicketParamsType) {
  const stringSeat = ticket.seat.map((s) => s.toString());
  const { data, error } = await supabase.from("ticket").insert({
    ...ticket,
    status: "success",
    seat: stringSeat,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const useAddReview = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: ({ ticket }: { ticket: RequiredTicketParamsType }) =>
      addReview(ticket),
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError();
    },
  });
};
