import React from "react";

import { useContext } from "react";
import { Button } from "@nextui-org/react";
import { UserContext } from "../..//utils/subProviders";

export default function RemoveAddress({ index = -1 }) {
  const userStore = useContext(UserContext);
  const { update } = userStore;
  const { addresses } = userStore.user;

  const handleRemove = () => {
    addresses.splice(index, 1);
    update({ ...userStore.user, addresses });    
  }

  return (
    <Button size="sm" onPress={handleRemove} color="danger">Remove</Button>
  );
}
