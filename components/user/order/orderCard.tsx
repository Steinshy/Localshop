// React
import { FC } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Card, CardHeader, CardBody, Chip, Button } from '@nextui-org/react';

// Components
import OrderProductCard from '@components/user/order/orderProductCard';

// Interfaces
import { AddressResponse } from '@interfaces/userAddress';
import { OrderCardProps, chipColorsProps } from '@interfaces/userOrder';

const OrderCard: FC<OrderCardProps> = ({ order, detailed = false }) => {
  const {
    attributes: { id, total, createdAt, totalItems, status, items, shipping, billing }
  } = order;
  const {
    data: {
      attributes: { firstname: shippedToFirstname, lastname: shippedToLastname }
    }
  } = shipping;
  const {
    data: {
      attributes: { firstname: billedToFirstname, lastname: billedToLastname }
    }
  } = billing;

  const chipColors: chipColorsProps = {
    Cancelled: 'danger',
    Pending: 'warning',
    Processing: 'secondary',
    Shipped: 'primary',
    Delivered: 'success'
  };

  const Address = ({ address }: { address: { data: AddressResponse } }) => {
    const {
      data: { attributes }
    } = address;
    const { lastname, firstname, address: line, zip, city, state, country, phone } = attributes;

    return (
      <>
        <p>
          {' '}
          {lastname} {firstname}
        </p>
        <p>{line}</p>
        <p>
          {zip} {city} {state} {country}
        </p>
        <p>{phone}</p>
      </>
    );
  };

  return (
    <Card className="border-2 w-full">
      <CardHeader className="flex items-center justify-between bg-gray-100">
        <div className="flex justify-center items-center gap-2">
          <p className="font-semibold">#{id}</p>
          <p>-</p>
          <p>{createdAt}</p>
          <p>-</p>
          <p>{total}</p>
        </div>

        <Chip size="sm" className="text-white" color={chipColors[status]}>
          {status}
        </Chip>
      </CardHeader>

      {/* Multiple Products Cards */}
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {detailed ? (
              <>
                <p className="text-md font-semibold mb-1">Shipped to</p>
                <Address address={shipping} />
                <p className="text-md font-semibold my-1">Billed to</p>
                <Address address={billing} />
              </>
            ) : (
              <>
                <p className="text-md font-semibold">
                  Shipped to {shippedToLastname} {shippedToFirstname}
                </p>
                <p className="text-md font-semibold">
                  Billed to {billedToLastname} {billedToFirstname}
                </p>
              </>
            )}
            <p className="text-md font-semibold mt-1">Products: {totalItems}</p>
          </div>
          {!detailed && (
            <Button className="text-white" as={Link} href={`/user/orders/${id}`} size="sm" color="primary">
              Views Details
            </Button>
          )}
        </div>

        <div className={detailed ? 'grid grid-cols-1 gap-2 mt-2' : 'flex gap-2 mt-2 p-1'}>
          {items.map((item) => (
            <OrderProductCard key={`product_${id}`} item={item} detailed={detailed} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
