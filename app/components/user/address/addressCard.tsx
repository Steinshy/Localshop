'use client';

// React
import { FC, useContext, useEffect, useState } from 'react';

// NextUI
import { Card, CardBody, Chip, Button } from '@nextui-org/react';

// Icons
import { FaTrash } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

// Components
import AddressModal from '@components/user/address/addressModal';

// Utils
import { CartContext } from '@utils/subProviders';

// Interfaces
import { AddressCardProps } from '@interfaces/userAddress';

const AddressCard: FC<AddressCardProps> = ({ addresses, address, handleCreate, handleUpdate, handleRemove,
  selectable = false, type }) => {
  const { id, attributes } = address;
  const { label, firstname, lastname, address:line, city, country, state, zip, phone,
          default: addressDefault } = attributes;

  const cartStore = useContext(CartContext);
  const { shipping, billing, setShipping, setBilling } = cartStore;
  
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    const getSelected = () :boolean => {
      if (!type) return false;

      if (type === 'shipping') {
        if (!shipping) return false;
        return shipping.id === id;
      }

      if (type === 'billing') {
        if (!billing) return false;
        return billing.id === id;
      }

      return false;
    }

    setSelected(getSelected());
  }, [shipping, billing, id, type])

  const addToContext = () => {
    if (type === 'shipping') setShipping(address);
    if (type === 'billing') setBilling(address);
  }

  const removeFromContext = () => {
    if (type === 'shipping') setShipping(undefined);
    if (type === 'billing') setBilling(undefined);
  }

  const handleSelect = () => {
    if (type === 'shipping') {
      if (!shipping || shipping.id !== id) return addToContext();
      if (shipping && shipping.id === id) return removeFromContext();
    }
    if (type === 'billing') {
      if (!billing || billing.id !== id) return addToContext();
      if (billing && billing.id === id) return removeFromContext();
    }
  };

  return (
    <div className='relative'>
      <Card
        className={`border-2 w-full h-full ${selected ? 'border-primary' : 'border-transparent'}`}
        isPressable={selectable}
        onClick={selectable ? handleSelect : undefined}
      >
        <CardBody>
          <div className='flex items-center gap-2'>
            <FaLocationDot className='text-primary' />
            <h2 className='font-semibold'>{label}</h2>
          </div>
          <p>{lastname} {firstname}</p>
          <p>{line}</p>
          <p>{zip} {city} {state} {country}</p>
          <p>{phone}</p>
        </CardBody>
      </Card>
      <div className='absolute top-2 right-2 flex gap-1'>
        {addressDefault && (
          <Chip variant='flat' color='primary' size='sm' radius='sm'>
            Default
          </Chip>
        )}
        <AddressModal id={id} addresses={addresses} handleUpdate={handleUpdate} handleCreate={handleCreate} />
        <Button isIconOnly size='sm' onClick={() => void handleRemove(id)} variant='flat' color='danger'>
          <FaTrash className='text-lg' />
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
