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
import { showToast } from '@utils/helpers';

// Actions
import { addAddresses, removeAddresses } from '@actions/actionsCart';

// Interfaces
import { AddressCardProps } from '@interfaces/userAddress';

const AddressCard: FC<AddressCardProps> = ({ addresses, address, handleCreate, handleUpdate, handleRemove,
  selectable = false, type }) => {
  const cartStore = useContext(CartContext);
  const { update, selectedAddresses, setSelectedAddresses } = cartStore;
  const { id, attributes } = address;
  const { label, firstname, lastname, address:line, city, country, state, zip, phone,
          default: addressDefault } = attributes;
  const [selected, setSelected] = useState<boolean>(false),
        [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const getSelected = () :boolean => {
      if (!type) return false;
      const address = selectedAddresses.find(item => item.type === type && item.id.toString() === id);
      if (address) return true;
      return false;
    }

    setSelected(getSelected());
  }, [selectedAddresses, id, type])

  const add = async (id: string, typeInt: number) => {
    const { data, error } = await addAddresses(id, typeInt);
    setIsFetching(false);
    if (!error) return update(data);
    setSelectedAddresses([]);
    showToast(error.message, 'error');
  }

  const remove = async (id: string, typeInt: number) => {
    const { data, error } = await removeAddresses(id, typeInt);
    setIsFetching(false);
    if (!error) return update(data);
    setSelectedAddresses([]);
    showToast(error.message, 'error');
  }

  const handleSelect = () => {
    if (!type) return;
    setIsFetching(true);
    const index = selectedAddresses.findIndex(item => item.type === type),
          typeInt = type === 'shipping' ? 0 : 1;
    if (index === -1) return void add(id, typeInt);
    const sameID:boolean = selectedAddresses[index].id.toString() === id;
    sameID ? void remove(id, typeInt) : void add(id, typeInt);
  };

  return (
    <div className='relative'>
      <Card
        className={`border-2 w-full h-full ${selected ? 'border-primary' : 'border-transparent'}`}
        isPressable={selectable}
        onClick={selectable ? handleSelect : undefined}
        isDisabled={isFetching}
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
