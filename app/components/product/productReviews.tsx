// React
import { FC } from "react";
// NextUI
import { Card, CardBody, CardHeader, Avatar, Divider } from "@nextui-org/react";

// React Icons
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

// Components
import StarsReviews from "@components/product/starsReviews";
// Interface
import { ReviewProps } from "@interfaces/reviews";

const ProductReviews: FC<{ review: ReviewProps }> = ({ review }) => {
  const { attributes } = review;
  const { body, rating, author } = attributes;
  const { firstname, lastname, avatar } = author;

  return (
    <Card className="max-w-[500px]">
      <CardHeader className="flex justify-between items-center gap-3">
        <Avatar isBordered color="primary" size="sm" src={avatar.small} />
        <div className="flex flex-col">
          <span className="font-semibold">{`${firstname} ${lastname}`}</span>
          <StarsReviews rating={rating} />
        </div>
        {rating > 3 ? (
          <div className="text-green-500">
            <FaRegThumbsUp />
          </div>
        ) : (
          <div className="text-red-500">
            <FaRegThumbsDown />
          </div>
        )}
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="whitespace-pre-line">{body}</p>
      </CardBody>
    </Card>
  );
};

export default ProductReviews;
