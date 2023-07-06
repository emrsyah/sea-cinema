import supabase from "@/lib/supabase/supabase";
import { useMutation } from "@tanstack/react-query";

async function cancelTicket(ticketId: number) {
  const { data, error } = await supabase.from("ticket").update({status: "cancelled"}).eq("id", ticketId)
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const useCancelTicket = ({
  onSuccess,
  onError,
}: {
  onSuccess?: any;
  onError?: any;
}) => {
  return useMutation({
    mutationFn: ({ ticketId }: { ticketId: number }) => cancelTicket(ticketId),
    onSuccess: (data) => {
      onSuccess();
    },
    onError: (err) => {
      onError();
    },
  });
};
