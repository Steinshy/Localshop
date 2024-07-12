import { PagyProps } from "./general";

type AddressResponse = {
  id: string;
  type: string;

  attributes: {
    id: number;
    label: string;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    phone: number;
    default: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

type AddressValuesProps = {
  label: string;
  firstname: string;
  lastname: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  phone: number;
  default: boolean;
};

type AddressModalProp = {
  addresses: AddressResponse[];
  id?: string;
  handleCreate: (newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
  handleUpdate: (id: string, newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
};

type AddressListProps = {
  items?: AddressResponse[];
  selectable?: boolean;
  type?: string;
  selected?: number | null;
  title?: string;
  pageInfos?: PagyProps;
};

type AddressCardProps = {
  addresses: AddressResponse[];
  address: AddressResponse;
  selectable?: boolean;
  type?: string;
  handleCreate: (newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
  handleUpdate: (id: string, newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
  handleRemove: (id: string) => Promise<void>;
};

export type { AddressResponse, AddressValuesProps, AddressModalProp, AddressListProps, AddressCardProps };
