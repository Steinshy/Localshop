// React
import { FC } from "react";

// NextUI
import { Card, CardBody, CardHeader, Avatar, Divider } from "@nextui-org/react";

// Components
import StarsReviews from "@/app/products/components/starsReviews";

// Interfaces
interface ReviewProps {
  review: {
    id: number;
    author: string;
    comment: string;
    rating: number;
  }
}

const ProductReviews: FC<ReviewProps> = ({ review }) => (
  <Card className="max-w-[500px]">
    <CardHeader className="flex gap-3">
      <Avatar
        isBordered
        className="shrink-0"
        color="primary"
        size="sm"
        src="https:i.pravatar.cc/150?u=a042581f4e29026704d"
      />
      <div className="flex flex-col">
        <div>{review.author}</div>
        <StarsReviews rating={review.rating} />
      </div>
    </CardHeader>
    <Divider />
    <CardBody className="flex">
      <p>{review.comment}</p>
    </CardBody>
  </Card>
);

export default ProductReviews;
