// React
import { FC } from "react";

// Utils
import { round } from "@utils/helpers";

// Interfaces
import { StarsReviewsProps } from "@interfaces/reviews";

const StarsReviews: FC<StarsReviewsProps> = ({ rating }) => {
  const roundedRating = round(rating);
  
  const svgStars = Array.from({ length: 5 }, (_, i) => {
    const isFullStar = i < roundedRating;
    const starColor = isFullStar ? "text-yellow-500" : "text-gray-300";
    return (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ${starColor}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    );
  });
  return <div className="flex items-center gap-1">{svgStars}</div>;
};


export default StarsReviews;
