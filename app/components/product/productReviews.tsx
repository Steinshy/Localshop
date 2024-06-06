// NextUI
import { Card, CardBody, CardHeader, Avatar, Divider } from "@nextui-org/react";

// React Icons
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

// Components
import StarsReviews from "@components/product/starsReviews";
// Interface
import { ReviewProps } from "@interfaces/reviews";

const ProductReviews = ({ review }: { review: ReviewProps }) => {
  const { attributes } = review;
  const { body, rating, author } = attributes;
  const { firstname, lastname, avatar } = author;

  return (
    <Card className="max-w-[500px]">
      <CardHeader className="flex gap-3">
        <Avatar isBordered className="shrink-0" color="primary" size="sm" src={avatar.small} />
        <div className="flex flex-col">
          {firstname} {lastname}
        </div>
        <StarsReviews rating={rating} />
        <div className={`${rating > 3 ? "text-green-500" : "text-red-500"}`}>
          {rating > 3 ? <FaRegThumbsUp /> : <FaRegThumbsDown />}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex">
        <p>{body}</p>
      </CardBody>
    </Card>
  );
};

export default ProductReviews;
