// Components
import Breadcrumb from "@components/layout/breadCrumb";
import AddressList from "@components/user/address/addressList";

// Actions
import { getAddresses } from "actions";

const AddressesPage = async () => {
  const { data:addresses, error } = await getAddresses();
  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Addresses" }];

  return (
    <div className="max-w-screen-md mx-auto w-full">
      <Breadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl mb-2">Addresses</h1>
      
      <div className="grid grid-cols-1 gap-3">
        <AddressList items={addresses} />
      </div>
    </div>
  );
}

export default AddressesPage;
