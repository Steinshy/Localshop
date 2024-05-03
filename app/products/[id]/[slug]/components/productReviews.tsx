// React
import { FC } from "react";

// NextUI
import { Card, CardBody, CardHeader, Avatar, Divider } from "@nextui-org/react";

// React Icons
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

// Components
import StarsReviews from "@/app/products/components/starsReviews";
// Interface
import { ReviewProps } from "@/app/interfaces/reviews";

const ProductReviews: FC<ReviewProps> = ({ review }) => (
  <Card className="max-w-[500px]">
    <CardHeader className="flex gap-3">
      <Avatar isBordered className="shrink-0" color="primary" size="sm" src={review.avatar} />

      <div className="flex flex-col">{review.author}</div>
      <StarsReviews rating={review.rating} />
      {review.rating > 3 ? <FaRegThumbsUp className="text-green-500" /> : <FaRegThumbsDown className="text-red-500" />}
    </CardHeader>
    <Divider />
    <CardBody className="flex">
      <p>{review.comment}</p>
    </CardBody>
  </Card>
);

export default ProductReviews;
