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
  // Review
  const { attributes } = review;
  const { body, rating, author } = attributes;

  // Author
  const { data: { attributes: authorAttributes } } = author;
  const { firstname, lastname, avatar } = authorAttributes;
  const { small: imgAvatar } = avatar

  return (
    <Card className='max-w-[500px]'>
      <CardHeader className='flex justify-between items-center gap-3'>
        <Avatar isBordered color='primary' size='sm' src={imgAvatar} />
        <div className='flex flex-col'>
          <span className='font-semibold'>{`${firstname} ${lastname}`}</span>
          <ReviewsStars rating={rating} />
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
