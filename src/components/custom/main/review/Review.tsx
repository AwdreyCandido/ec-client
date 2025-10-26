import { ReviewType } from "@/src/data/types/review";
import React from "react";

type ReviewProps = {
  review: ReviewType;
};

const Review: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div
      key={review.id}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <p className="text-yellow-500 font-semibold mb-2">⭐ {review.rating}/5</p>
      <p className="text-gray-700 text-base">{review.comment}</p>
      <p className="text-gray-400 text-sm mt-2">
        {new Date(review.createdAt).toLocaleDateString("pt-BR")}
      </p>
    </div>
  );
};

export default Review;
