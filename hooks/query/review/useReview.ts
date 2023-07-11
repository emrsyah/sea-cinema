import supabase from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

const getReview = async (movieName: string) => {
  let { data: review, error } = await supabase
    .from("review")
    .select("*")
    .eq("movieName", movieName)
    .order("createdAt", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  let { data: avgRating, error: err2 } = await supabase.rpc("get_movie_avg_rating", {
    movie_name: movieName,
  });

  if (err2) {
    throw new Error(err2.message);
  } 

  return {review, avgRating};
};

export const useReview = ({ movieName }: { movieName: string }) => {
  return useQuery({
    queryKey: ["review"],
    queryFn: () => getReview(movieName),
  });
};
