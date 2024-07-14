import { ReactNode } from 'react';
import { PagyProps } from './general';
import { ErrorObj } from './httpUtils';

export type AddressResponse = {
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

export type AddressValuesProps = {
  label: string;
  firstname: string;
  lastname: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  phone?: number;
  default: boolean;
};

export type AddressModalProp = {
  addresses: AddressResponse[];
  id?: string;
  handleCreate: (newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
  handleUpdate: (id: string, newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
};

export type AddressListProps = {
  items?: AddressResponse[];
  selectable?: boolean;
  type?: string;
  selected?: number | null;
  title?: string;
  pageInfos?: PagyProps;
  pageError?: Error | ErrorObj | string;
  endContent: ReactNode;
};

export type AddressCardProps = {
  addresses: AddressResponse[];
  address: AddressResponse;
  selectable?: boolean;
  type?: string;
  handleCreate: (newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
  handleUpdate: (id: string, newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
  handleRemove: (id: string) => Promise<void>;
};
