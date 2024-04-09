import { Card, CardBody } from "@nextui-org/react";

import AddressModal from "../../user/components/addressModal";
import RemoveAddress from "../../user/components/removeAddress";
import { AddressObj } from "../../utils/interfaces";

const AddressCard = (address:AddressObj) => (
  <Card>
    <CardBody>
      <h2 className="font-semibold">{address.label}</h2>
      <p>{address.firstname} {address.lastname}</p>
      <p>{address.address}</p>
      <p>{address.city}, {address.country} {address.postalCode}</p>
      <p>{address.default ? "Default" : ""}</p>
      <div className="flex gap-2">
        <AddressModal id={address.id} />
        <RemoveAddress id={address.id} />
      </div>
    </CardBody>
  </Card>
);

export default AddressCard;