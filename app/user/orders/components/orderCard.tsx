// React
import { FC } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Card, CardBody, Chip } from "@nextui-org/react";

// Utils
import { readableDate } from "../../../utils/helpers";

// Interfaces
import { OrderCardProps } from "../../../interfaces/general";

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { id, label, status, date, total, productsTotal } = order;

  const chipColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Processing":
        return "warning";
      case "Canceled":
        return "danger";
      default:
        return "default";
    }
  }

  return (
    <Card
      className={`border-2 w-full h-full`}
      isPressable
      as={Link}
      href={`/user/orders/${id}`}
    >
      <CardBody>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{label}</h2>
          <Chip size="sm" className="text-white" color={chipColor(status)}>{status}</Chip>
        </div>
        
        <p>Date: {readableDate(date)}</p>
        <p>Total: {total}€</p>
        <p>{productsTotal} products</p>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
