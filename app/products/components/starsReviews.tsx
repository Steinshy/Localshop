// React
import { FC } from "react";

// Utils
import { round } from "@/app/utils/helpers";

// Interfaces
import { StarsReviewsProps } from "@/app/interfaces/reviews";

const StarsReviews: FC<StarsReviewsProps> = ({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ${i < round(rating) ? "text-yellow-500" : "text-gray-300"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ))}
  </div>
);

export default StarsReviews;
