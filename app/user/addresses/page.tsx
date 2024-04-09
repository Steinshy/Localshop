import AddressList from "../../user/components/addressList";

export default function Addresses() {

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">Addresses</h1>
      
      <AddressList />
    </div>
  );
}