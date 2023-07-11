import supabase from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

const getReview = async (userId: string) => {
    
  let { data: review, error } = await supabase.from("review").select("*").eq("userId", userId).order("createdAt", {ascending: false});
  if (error) {
    throw new Error(error.message);
  }
  return review;
};

export const useReview = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["review"],
    queryFn: () => getReview(userId),
  });
};
