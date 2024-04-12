// React
import { FC } from "react";

// Components
import AddressList from "./components/addressList";

const Addresses:FC = () => {
  return (
    <div className="max-w-screen-md mx-auto w-full">
      <h1 className="text-2xl mb-2">Addresses</h1>
      
      <div className="grid grid-cols-1 gap-3">
        <AddressList />
      </div>
    </div>
  );
}

export default Addresses;