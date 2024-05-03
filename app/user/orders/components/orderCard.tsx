// React
import { FC } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";

// Utils
import { readableDate } from "@/app/utils/helpers";

// Interfaces
import { OrderCardProps } from "@/app/interfaces/user";

import { chipColor } from "@/app/data/orders";

const OrderCard: FC<OrderCardProps> = ({ order, user }) => {
  const { id, invoice, status, date, total, productsTotal } = order;
  const { firstname, lastname } = user;

  return (
    <Card className={`border-2 w-full h-full`} isPressable as={Link} href={`/user/orders/${id}`}>
      <CardHeader className="flex items-center justify-between bg-gray-100">
        <p>Date: {readableDate(date)}</p>
        <p>Total: {total}€</p>
        <p>Dispatched to:{lastname} {firstname}</p>
        <p>Order ID: {invoice}</p>
        <Chip size="sm" className="text-white" color={chipColor(status)}>
          {status}
        </Chip>
      </CardHeader>

      <CardBody>
        <div className="flex items-center justify-between">
          <p>{productsTotal} products</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
