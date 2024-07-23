// React
import { ReactNode } from 'react';

// Interfaces
import { PagyProps } from '@interfaces/general';
import { ErrorObj } from '@interfaces/httpUtils';

// actionsUserAddress | cartShipping | cartSummary | addressList | orderCard | dataAddress
// Interfaces => cart | Providers | userAddress | userOrder | cartProvider
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

// actionsUserAddress | addressList | addressModal | interfaces => userAddress
export type AddressValuesProps = {
  label: string;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone?: number;
  default?: boolean;
};

// addressModal
export type AddressModalProp = {
  addresses: AddressResponse[];
  id?: string;
  handleCreate: (newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
  handleUpdate: (id: string, newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
};

// addressList
export type AddressListProps = {
  items?: AddressResponse[];
  selectable?: boolean;
  type?: string;
  selected?: number | null;
  title?: string;
  pageInfos?: PagyProps;
  pageError?: Error | ErrorObj | string;
  endContent?: ReactNode;
};

// addressCard
export type AddressCardProps = {
  addresses: AddressResponse[];
  address: AddressResponse;
  selectable?: boolean;
  type?: string;
  handleCreate: (newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
  handleUpdate: (id: string, newAddress: AddressValuesProps) => Promise<{ [key: string]: string } | undefined>;
  handleRemove: (id: string) => Promise<void>;
};
