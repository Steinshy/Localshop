// React
import { FC } from "react";

// NextUI
import { Button } from "@nextui-org/react";

// Icons
import { FaTrash } from "react-icons/fa";

// Utils
import { showToast } from "@utils/helpers";
import http from "@utils/http";

interface RemoveAddressProps {
  id: number;
  fetch: () => void;
}

const RemoveAddress: FC<RemoveAddressProps> = ({ fetch, id }) => {

  const handleRemove = () => {
    // Remove request
    const apiFetch = async () => {
      await http.delete(`/addresses/${id}`);
      fetch();
      showToast('Address deleted!', 'success');
    }

    void apiFetch();
  };

  return (
    <Button isIconOnly size="sm" onPress={handleRemove} variant="flat" color="danger">
      <FaTrash className="text-lg" />
    </Button>
  );
};

export default RemoveAddress;
