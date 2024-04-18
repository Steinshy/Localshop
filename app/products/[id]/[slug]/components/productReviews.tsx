import { FC } from "react";
import { Card, CardBody, CardHeader, Avatar, Divider } from "@nextui-org/react";
import StarsReviews from "@/app/products/components/starsReviews";

const ProductReviews: FC<{ productRating: number }> = ({ productRating }) => {
  const usernameReview = "Elza Veles";

  return (
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
          <h2>{usernameReview}</h2>
          <StarsReviews productRating={productRating} />
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex">
        <h3>I&apos;m {usernameReview}, and THIS is my favorite store on the citadel </h3>
      </CardBody>
    </Card>
  );
};

export default ProductReviews;
