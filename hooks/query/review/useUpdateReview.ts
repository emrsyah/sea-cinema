import supabase from "@/lib/supabase/supabase";
import { PickedReviewType } from "@/types";
import { useMutation } from "@tanstack/react-query";

async function updateReview(review: PickedReviewType) {
  const { data, error } = await supabase
    .from("review")
    .update({
      ...review,
    })
    .eq("id", review.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const useUpdateReview = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: ({ review }: { review: PickedReviewType }) =>
      updateReview(review),
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError();
    },
  });
};
