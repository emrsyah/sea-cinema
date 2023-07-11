import supabase from "@/lib/supabase/supabase";
import { InputReviewType } from "@/types";
import { useMutation } from "@tanstack/react-query";

async function addReview(review: InputReviewType) {
  const { data, error } = await supabase.from("review").insert({
    ...review,
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
    mutationFn: ({ review }: { review: InputReviewType }) => addReview(review),
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError();
    },
  });
};
