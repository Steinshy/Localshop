// React
import { FC } from "react";

// NextUI
import { Card, CardBody, Chip } from "@nextui-org/react";

// Components
import AddressModal from "@components/user/addressModal";
import RemoveAddress from "@components/user/removeAddress";

// Interfaces
import { AddressCardProps } from "@interfaces/address";

const AddressCard: FC<AddressCardProps> = ({
  fetch,
  addresses,
  selected,
  setSelected,
  address,
  selectable = false,
}) => {
  const { attributes } = address;
  const { label, firstname, lastname, address: addressLine, city, country, zip, default: addressDefault } = attributes;

  const handleSelect = () => {
    setSelected?.(address.id);
  };

  return (
    <div className="relative">
      <Card
        className={`border-2 w-full h-full ${selected === address.id ? "border-primary" : "border-transparent"}`}
        isPressable={selectable}
        onClick={handleSelect}
      >
        <CardBody>
          <h2 className="font-semibold">{label}</h2>
          <p>
            {firstname} {lastname}
          </p>
          <p>{addressLine}</p>
          <p>
            {city} {country} {zip}
          </p>

          <div className="absolute top-2 right-2 flex gap-1">
            {addressDefault && (
              <Chip variant="flat" color="primary" size="sm" radius="sm">
                Default
              </Chip>
            )}
            <AddressModal fetch={fetch} id={address.id} addresses={addresses} />
            <RemoveAddress fetch={fetch} id={address.id} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddressCard;
