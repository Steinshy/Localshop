// React
import { FC } from "react";

// NextUI
import { Button } from "@nextui-org/react";

// Modules
import { FaTrash } from "react-icons/fa";

const RemoveAddress: FC<{ id: number }> = ({ id }) => {

  const handleRemove = () => {
    // Remove request
  };

  return (
    <Button isIconOnly size="sm" onPress={handleRemove} variant="flat" color="danger">
      <FaTrash className="text-lg" />
    </Button>
  );
};

export default RemoveAddress;
