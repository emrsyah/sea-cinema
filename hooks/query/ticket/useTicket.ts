import supabase from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

const getTicket = async (userId: string) => {
    
  const { data: ticket, error } = await supabase.from("ticket").select("*").eq("userId", userId).order("createdAt", {ascending: false});
  if (error) {
    throw new Error(error.message);
  }
  const { data: review, error: errorReview } = await supabase.from("review").select("*").eq("userId", userId).order("createdAt", {ascending: false});
  if (errorReview) {
    throw new Error(errorReview.message);
  }
  // console.log(review)
  const ticketWithReview = ticket.map((ticket) => {
    if(review === null || review.length === 0){
      return {
        ...ticket,
        review: false
      }
    } else {
      const reviewForTicket = review.find((r) => r.movieName === ticket.movieName);
      return {
        ...ticket,
        review: reviewForTicket ? reviewForTicket : false
      };
    }
  });
  return ticketWithReview;
};

export const useTicket = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["ticket"],
    queryFn: () => getTicket(userId),
  });
};
