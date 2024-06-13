// React
import { FC } from "react";

// NextUI
import { Card, CardBody, Chip, Button } from "@nextui-org/react";

// Icons
import { FaTrash } from "react-icons/fa";

// Components
import AddressModal from "@components/user/addressModal";

// Interfaces
import { AddressCardProps } from "@interfaces/address";

const AddressCard: FC<AddressCardProps> = ({
  fetch,
  addresses,
  selected,
  setSelected,
  address,
  selectable = false,
  handleUpdate,
  handleRemove
}) => {
  const { attributes } = address;
  const { label, firstname, lastname, address: addressLine, city, country, zip, id, default: addressDefault } = attributes;

  const handleSelect = () => {
    setSelected?.(id);
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
            <AddressModal fetch={fetch} id={id} addresses={addresses} handleUpdate={handleUpdate} />
            <Button isIconOnly size="sm" onClick={() => void handleRemove(id)} variant="flat" color="danger">
              <FaTrash className="text-lg" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddressCard;
