import supabase from "@/lib/supabase/supabase";
import { RequiredTicketParamsType } from "@/types";
import { useMutation } from "@tanstack/react-query";

async function addTicket(ticket: RequiredTicketParamsType) {
  // console.log(ticket)
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

export const useAddTicket = ({
  onSuccess,
  onError,
}: {
  onSuccess?: any;
  onError?: any;
}) => {
  return useMutation({
    mutationFn: ({ ticket }: { ticket: RequiredTicketParamsType }) =>
      addTicket(ticket),
    onSuccess: (data) => {
      onSuccess();
    },
    onError: (err) => {
      onError();
    },
  });
};
