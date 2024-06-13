type AddressAttr = {
  id: number;
  label: string;
  firstname: string;
  lastname: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: number;
  default: boolean;
  createdAt: string;
  updatedAt: string;
};

type AddressObj = {
  id: number;
  type: string;
  attributes: AddressAttr;
};

type AddressModalProp = {
  addresses: AddressObj[];
  id?: number;
  fetch: () => Promise<void>;
  handleUpdate: (id: number, newAddress: AddressValuesProps) => Promise<void>;
};

type AddressValuesProps = {
  label: string;
  firstname: string;
  lastname: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: number;
  default: boolean;
};

type AddressListProps = {
  items?: AddressObj[];
  selected?: number | null;
  setSelected?: (id: number) => void;
  selectable?: boolean;
};

type AddressCardProps = {
  addresses: AddressObj[];
  selected?: number | null;
  setSelected?: (id: number) => void;
  address: AddressObj;
  selectable?: boolean;
  fetch: () => Promise<void>;
  handleRemove: (id:number) => Promise<void>;
  handleUpdate: (id: number, newAddress: AddressValuesProps) => Promise<void>;
};

export type { AddressAttr, AddressObj, AddressModalProp, AddressValuesProps, AddressListProps, AddressCardProps };
