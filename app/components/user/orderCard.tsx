// React
import { FC } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";

// Utils
import { readableDate } from "@utils/helpers";

// Interfaces
import { OrderCardProps } from "@interfaces/orders";

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { attributes: { id, total, createdAt, totalItems, status, user } } = order;
  const { data: { attributes: { firstname, lastname } } } = user;

  return (
    <Card className={`border-2 w-full h-full`} isPressable>
      <CardHeader className="flex items-center justify-between bg-gray-100">
        <p>Date: {readableDate(createdAt)}</p>
        <p>Total: {total}€</p>
        <p>
          Dispatched to:{lastname} {firstname}
        </p>
        <p>Order ID: {id}</p>
        <Chip size="sm" className="text-white">
          {status}
        </Chip>
      </CardHeader>

      {/* Multiple Products Cards */}
      <CardBody className="">
        <div className="flex items-center justify-between">
          <p className="text-lg">Products: {totalItems}</p>
          <Chip className="text-white" as={Link} href={`/user/orders/${id}`} size="sm" color="primary">
            Views Details
          </Chip>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
