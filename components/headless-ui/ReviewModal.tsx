"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "react-feather";
import StarRating from "../StarRating";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddReview } from "@/hooks/query/review/useAddReview";
import { useReviewModalStore } from "@/store";
import { toast } from "react-toastify";
import { useUpdateReview } from "@/hooks/query/review/useUpdateReview";
import { useTicket } from "@/hooks/query/ticket/useTicket";

type reviewInput = {
  review: string;
};

const ReviewModal = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const { isOpen, movieName, toggle, review, setReview } =
    useReviewModalStore();
  const [rating, setRating] = useState(5);
  const { mutate: addReview, isLoading } = useAddReview({
    onSuccess: () => onSuccessReview(),
  });
  const {mutate: updateReview, isLoading: isLoadingUpt} = useUpdateReview({ onSuccess: () => onSuccessReview() });
  const {refetch} = useTicket({userId: userId})

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<reviewInput>();

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setValue("review", review.review);
    }
  }, [review]);

  const onSuccessReview = () => {
    toast.success("Review Success", { autoClose: 1500 });
    refetch()
    closeHandler();
  };

  const submitHandler: SubmitHandler<reviewInput> = (input) => {
    if (review && review.id !== -1) {
      // Update
      updateReview({
        review: {
          id: review.id,
          rating: rating,
          review: input.review
        }
      })
    } else {
      // Insert
      addReview({
        review: {
          review: input.review,
          movieName: movieName,
          rating: rating,
          userId: userId,
          username: username,
        },
      });
    }
  };

  const closeHandler = () => {
    setValue("review", "");
    setReview({
      id: -1,
      review: "",
      rating: 5,
    });
    setRating(5);
    toggle();
  };

  return (
    <Dialog open={isOpen} onClose={closeHandler} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto w-full max-w-lg rounded bg-gray-900 p-4 shadow-xl">
          <div className="flex items-center justify-between border-b-[1.5px] border-b-gray-800 pb-2">
            <Dialog.Title className="flex items-center gap-3 font-semibold">
              <p className="raleway text-lg">Review Your Movie | {movieName}</p>
            </Dialog.Title>
            <button
              className="text-gray-600 hover:text-white"
              onClick={closeHandler}
            >
              <X size="20" />
            </button>
          </div>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mt-3 mb-5  flex flex-col gap-3">
              <textarea
                className="input-txt text-sm"
                placeholder="Your Review"
                defaultValue={""}
                maxLength={150}
                {...register("review", { maxLength: 150, minLength: 0 })}
              />
              {errors.review && (
                <p className="text-sm font-medium raleway text-red-500">
                  {errors.review.type.includes("maxLength")
                    ? "Character overloaded"
                    : "Something wrong"}
                </p>
              )}
              <div className="flex items-center justify-between">
                <StarRating rating={rating} setRating={setRating} />
                <div className="raleway w-full items-end text-end  font-medium text-sm text-gray-500">
                  {watch("review") ? 150 - watch("review")?.length : "150"}{" "}
                  character remaining
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                disabled={(isLoading || isLoadingUpt)}
                onClick={closeHandler}
                type="button"
                className="text-sm btn-secondary"
              >
                Cancel
              </button>
              <button
                disabled={(isLoading || isLoadingUpt)}
                type="submit"
                className={`btn-primary text-sm ${
                  (isLoading || isLoadingUpt) ? "opacity-60" : ""
                }`}
              >
                {(isLoading || isLoadingUpt)
                  ? "Loading..."
                  : review?.id !== -1
                  ? "Update Review"
                  : "Confirm Review"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
