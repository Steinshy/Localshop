// React
import { FC } from 'react';

// Icons
import { FaStar } from 'react-icons/fa';

// Interface
import { ReviewsStarsProps } from '@interfaces/reviews';

const ReviewsStars: FC<ReviewsStarsProps> = ({ rating }) => {
  const roundedRating = Math.round(rating) || 0, fractionalPart = rating - roundedRating;
  const svgStars = Array.from({ length: 5 }, (_, i) => i).map((i) => {
    const starColor = i < roundedRating || (i === roundedRating && fractionalPart > 0) ? 'text-yellow-500' : 'text-gray-300';
    return <FaStar key={i} className={`h-4 w-4 ${starColor}`} />;
  });

  return (
    <div className='flex items-center gap-1'>
      {svgStars}
    </div>
  );
};

export default ReviewsStars;
