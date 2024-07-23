// React
import { FC } from 'react';

// Icons
import { FaStar } from 'react-icons/fa';

// Interface
import { ReviewsStarsProps } from '@interfaces/reviews';

const ReviewsStars: FC<ReviewsStarsProps> = ({ rating }) => {
  const roundedRating = Math.round(rating) || 0;
  const fractionalPart = rating - roundedRating;
  const starColor = (i: number) => (i < roundedRating || (i === roundedRating && fractionalPart > 0) ? 'text-yellow-500' : 'text-gray-300');

  const array = Array.from({ length: 5 });

  return (
    <div className="flex items-center gap-1">
      {array.map((_, i) => (
        <FaStar key={i} className={`h-4 w-4 ${starColor(i)}`} />
      ))}
    </div>
  );
};

export default ReviewsStars;
