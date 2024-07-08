type AddressResponse = {
  id: number;
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
  id?: number;
  handleCreate: (newAddress: AddressValuesProps) => Promise<void>;
  handleUpdate: (id: number, newAddress: AddressValuesProps) => Promise<void>;
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
  selected?: number | null;
  setSelected?: (id: number) => void;
  selectable?: boolean;
};

type AddressCardProps = {
  addresses: AddressResponse[];
  selected?: number | null;
  setSelected?: (id: number) => void;
  address: AddressResponse;
  selectable?: boolean;
  handleCreate: (newAddress: AddressValuesProps) => Promise<void>;
  handleUpdate: (id: number, newAddress: AddressValuesProps) => Promise<void>;
  handleRemove: (id: number) => Promise<void>;
};

export type { AddressResponse, AddressModalProp, AddressValuesProps, AddressListProps, AddressCardProps };
