// React
import { FC } from 'react';

// NextUI
import { Card, CardBody, CardHeader, Avatar, Divider } from '@nextui-org/react';

// Components
import ReviewsStars from '@components/product/reviewsStars';

// Icons
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

// Interfaces
import { ProductReviewProps } from '@interfaces/reviews';

const ProductReview: FC<ProductReviewProps> = ({ review }) => {
  const { attributes: { body, rating, author } } = review;
  const { data: { attributes: { firstname, lastname, avatar: { small } } } } = author;

  return (
    <Card className='w-full'>
      <CardHeader className='flex justify-between items-center gap-3'>
        <div className='flex items-center gap-3'>
          <Avatar isBordered color='primary' size='sm' src={small} />
          <div className='flex flex-col'>
            {firstname} {lastname}
            <ReviewsStars rating={rating} />
          </div>
        </div>
        {rating > 3 ? 
          <FaRegThumbsUp className='text-green-500' />
        : 
          <FaRegThumbsDown className='text-red-500' />
        }
      </CardHeader>
      <Divider />
      <CardBody>
        <p className='whitespace-pre-line'>{body}</p>
      </CardBody>
    </Card>
  );
};

export default ProductReview;
