// React
import { FC } from 'react';

// NextUI
import { Card, CardBody, Chip, Button } from '@nextui-org/react';

// Icons
import { FaTrash } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

// Components
import AddressModal from '@components/user/address/addressModal';

// Interfaces
import { AddressCardProps } from '@interfaces/userAddress';

const AddressCard: FC<AddressCardProps> = ({
  addresses,
  selected,
  setSelected,
  address,
  selectable = false,
  handleCreate,
  handleUpdate,
  handleRemove,
}) => {
  const { attributes } = address;
  const {
    label,
    firstname,
    lastname,
    address: addressLine,
    city,
    country,
    state,
    zip,
    id,
    default: addressDefault,
  } = attributes;

  const handleSelect = () => {
    setSelected?.(id);
  };

  return (
    <div className='relative'>
      <Card
        className={`border-2 w-full h-full ${selected === address.id ? 'border-primary' : 'border-transparent'}`}
        isPressable={selectable}
        onClick={handleSelect}
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
        </CardBody>
      </Card>
    </div>
  );
};

export default AddressCard;
