// React
import { FC } from "react";

// NextUI
import { Card, CardBody } from "@nextui-org/react";

// Components
// import RemoveAddress from "../../user/components/removeAddress";

// Interfaces
import { OrderCardProps } from "../../../utils/interfaces";

const OrderCard: FC<OrderCardProps> = ({ order }) => {

  return (
    <div className="relative h-[124px]">
      <Card
        className={`border-2 w-full h-full`}
      >
        <CardBody>
          <h2 className="font-semibold">{order.label}</h2>
          <p>
            {order.date}
          </p>
          <p>
            {order.total}
          </p>
          <p>
            {order.status}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderCard;
