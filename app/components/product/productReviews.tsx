"use server";

// React
import { FC } from "react";
// NextUI
import { Card, CardBody, CardHeader, Avatar, Divider } from "@nextui-org/react";

// React Icons
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

// Components
import StarsReviews from "@components/product/starsReviews";

import { ProductReviewsProps } from "@interfaces/reviews";
 
const ProductReviews: FC<ProductReviewsProps> = ({ review }) => {
  const { attributes: { body, rating, author: { firstname, lastname, avatar: { small } } } } = review
  const ratingIcon = rating > 3 ? <FaRegThumbsUp className="text-green-500" /> : <FaRegThumbsDown className="text-red-500" />;

  return (
    <Card className="max-w-[500px]">
      <CardHeader className="flex justify-between items-center gap-3">
        <Avatar isBordered color="primary" size="sm" src={small} />
          <div className="flex flex-col">
            <span className="font-semibold">{`${firstname} ${lastname}`}</span>
            <StarsReviews rating={rating} />
          </div>
        {ratingIcon}
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="whitespace-pre-line">{body}</p>
      </CardBody>
    </Card>
  );
};

export default ProductReviews;
