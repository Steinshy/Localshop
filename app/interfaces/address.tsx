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
    zip: number;
    phone: number;
    default: boolean;
    createdAt: string;
    updatedAt: string;
  }
};

type AddressModalProp = {
  addresses: AddressResponse[];
  id?: string;
  handleCreate: (newAddress: AddressValuesProps) => Promise<{ [key: string]: string; } | undefined>;
  handleUpdate: (id: string, newAddress: AddressValuesProps) => Promise<{ [key: string]: string; } | undefined>;
};

type AddressValuesProps = {
  label: string;
  firstname: string;
  lastname: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip: number;
  phone: number;
  default: boolean;
};

type AddressListProps = {
  items?: AddressResponse[];
  selectable?: boolean;
  type?: string;
};

type AddressCardProps = {
  addresses: AddressResponse[];
  address: AddressResponse;
  selectable?: boolean;
  type?: string;
  handleCreate: (newAddress: AddressValuesProps) => Promise<{ [key: string]: string; } | undefined>;
  handleUpdate: (id: string, newAddress: AddressValuesProps) => Promise<{ [key: string]: string; } | undefined>;
  handleRemove: (id: string) => Promise<void>;
};

export type { AddressResponse, AddressModalProp, AddressValuesProps, AddressListProps, AddressCardProps };
