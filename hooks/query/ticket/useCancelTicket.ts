import supabase from "@/lib/supabase/supabase";
import { useMutation } from "@tanstack/react-query";

async function cancelTicket(ticketId: number) {
  const { data, error } = await supabase
    .from("ticket")
    .update({ status: "cancelled" })
    .eq("id", ticketId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const useCancelTicket = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: ({ ticketId }: { ticketId: number }) => cancelTicket(ticketId),
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError();
    },
  });
};
