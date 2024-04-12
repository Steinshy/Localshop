// React
import { FC, useContext } from "react";

// NextUI
import { Button } from "@nextui-org/react";

// Modules
import { FaTrash } from "react-icons/fa";

// Providers
import { UserContext } from "../../utils/subProviders";

const RemoveAddress: FC<{ id: number }> = ({ id }) => {
  const userStore = useContext(UserContext);
  const { update } = userStore;
  const { addresses } = userStore.user;

  const handleRemove = () => {
    const index = addresses.findIndex((address) => address.id === id);
    addresses.splice(index, 1);
    update({ ...userStore.user, addresses });
  };

  return (
    <Button isIconOnly size="sm" onPress={handleRemove} variant="flat" color="danger">
      <FaTrash className="text-lg" />
    </Button>
  );
};

export default RemoveAddress;
