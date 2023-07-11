"use client";
import React, { useState } from "react";
import { Star } from "react-feather";

const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  return (
    <div className="w-full flex justify-start items-end gap-2">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
          >
            <Star
              className={`star w-6 h-6 ${
                star <= (hoveredRating || rating)
                  ? "filled text-yellow-500"
                  : "text-gray-500"
              }`}
            />
          </button>
        ))}
      </div>
      <p className="text-gray-400 font-semibold text-sm">({rating})</p>
    </div>
  );
};

export default StarRating;
