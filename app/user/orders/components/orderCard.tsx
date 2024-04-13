// React
import { FC } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Card, CardBody } from "@nextui-org/react";

// Interfaces
import { OrderCardProps } from "../../../interfaces/general";

const OrderCard: FC<OrderCardProps> = ({ order }) => (
  <Card
    className={`border-2 w-full h-full`}
    isPressable
    as={Link}
    href={`/user/orders/${order.id}`}
  >
    <CardBody>
      <h2 className="font-semibold">{order.label}</h2>
      <p>
        Date: {order.date}
      </p>
      <p>
        Total: {order.total}
      </p>
      <p>
        Status: {order.status}
      </p>
      <p>{order.productsTotal} products</p>
    </CardBody>
  </Card>
);

export default OrderCard;
