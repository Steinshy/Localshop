// React
import { FC } from "react";

// NextUI
import { Card, CardBody } from "@nextui-org/react";

// Components
import AddressModal from "../../user/components/addressModal";
import RemoveAddress from "../../user/components/removeAddress";

// Interfaces
import { AddressObj } from "../../utils/interfaces";

interface AddressCardProps {
  selected?: number|null,
  setSelected?: (id:number) => void,
  address: AddressObj,
  selectable?: boolean
}

const AddressCard:FC<AddressCardProps> = ({ selected, setSelected, address, selectable = false }) => {

  const handleSelect = () => {
    if (setSelected) {
      setSelected(address.id);
    }
  }

  return (
    <div className="relative h-[124px]">
      <Card
        className={`border-2 w-full h-full ${selected === address.id ? 'border-primary' : 'border-transparent'}`}
        isPressable={selectable}
        onClick={handleSelect}
      >
        <CardBody>
          <h2 className="font-semibold">{address.label}</h2>
          <p>{address.firstname} {address.lastname}</p>
          <p>{address.address}</p>
          <p>{address.city}, {address.country} {address.postalCode}</p>
          {/* <p>{address.default ? "Default" : ""}</p> */}
        </CardBody>
      </Card>
      <div className="absolute top-2 right-2 flex gap-1">
        <AddressModal id={address.id} />
        <RemoveAddress id={address.id} />
      </div>
    </div>
  );
}

export default AddressCard;