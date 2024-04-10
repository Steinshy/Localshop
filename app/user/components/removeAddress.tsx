// Recat
import { FC, useContext } from "react";

// NextUI
import { Button } from "@nextui-org/react";

// Modules
import { FaTrash } from "react-icons/fa";

// Utils
import { UserContext } from "../..//utils/subProviders";

interface RemoveAddressProps {
  id: number
}

const RemoveAddress:FC<RemoveAddressProps> = ({ id }) => {
  const userStore = useContext(UserContext);
  const { update } = userStore;
  const { addresses } = userStore.user;

  const handleRemove = () => {
    const index = addresses.findIndex((address) => address.id === id);
    addresses.splice(index, 1);
    update({ ...userStore.user, addresses });    
  }

  return (
    <Button isIconOnly size="sm" onPress={handleRemove} variant="flat" color="danger">
      <FaTrash className="text-lg" />
    </Button>
  );
}

export default RemoveAddress;