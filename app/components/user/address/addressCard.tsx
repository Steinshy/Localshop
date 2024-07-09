'use client';

// React
import { FC, useContext } from 'react';

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
import { AddressCardProps } from '@interfaces/address';

const AddressCard: FC<AddressCardProps> = ({addresses, address, handleCreate, handleUpdate, handleRemove,
  selectable = false, type }) => {
  const cartStore = useContext(CartContext);
  const { addressID, setAddressID } = cartStore;
  const { id, attributes } = address;
  const { label, firstname, lastname, address: addressLine, city, country, state, zip,
          default: addressDefault } = attributes;

  const handleSelect = () => {
    if (!type) return;
    setAddressID((prev) => ({...prev, [type]: id}));
  };

  const selected = type ? addressID[type] === id : false;

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
          <p>
            {firstname} {lastname}
          </p>
          <p>{addressLine}</p>
          <p>
            {city} {country} {state} {zip}
          </p>
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
