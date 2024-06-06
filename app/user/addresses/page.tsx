// Components
import Breadcrumb from "@components/layout/breadCrumb";
import AddressList from "@components/user/addressList";

// Interfaces
import { AddressObj } from "@interfaces/user";

// Utils
import http from "@utils/http";

const getAddresses = async () => {
  const response = await http.get("/user/addresses");
  const { data } = response.data as { data: AddressObj[] };
  return data;
};

const Addresses = async () => {
  const addresses = await getAddresses();
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
};

export default Addresses;
