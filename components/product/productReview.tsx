// React
import { FC } from 'react';

// NextUI
import { Card, CardBody, CardHeader, Avatar, Divider } from '@nextui-org/react';

// Components
import ReviewsStars from '@components/product/reviewsStars';

// Icons
import { FaRegThumbsUp } from 'react-icons/fa';

// Interfaces
import { ProductReviewProps } from '@interfaces/reviews';

const ProductReview: FC<ProductReviewProps> = ({ review }) => {
  if (!review) return null;

  const {
    attributes: { body, rating, author }
  } = review;
  const {
    data: {
      attributes: {
        firstname,
        lastname,
        avatar: { small }
      }
    }
  } = author;
  const thumbsClasses = `text-${rating > 3 ? 'green-500' : 'red-500'}`;

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Avatar isBordered color="primary" size="sm" src={small} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {firstname} {lastname}
            </span>
            <ReviewsStars rating={rating} />
          </div>
        </div>
        <FaRegThumbsUp className={`${thumbsClasses}`} />
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="whitespace-pre-line">{body}</p>
      </CardBody>
    </Card>
  );
};

export default ProductReview;
