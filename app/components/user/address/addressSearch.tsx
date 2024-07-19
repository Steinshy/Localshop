'use client';

// React
import { FC } from 'react';

// Icons
import { FaSearch } from 'react-icons/fa';

// NextUI
import { Input } from '@nextui-org/react';

// Interfaces

interface AddressSearchProps {
  query: string;
  setQuery: (query: string) => void;
  fetch: (page?: number, query?: string) => void;
  handleClear: () => void;
  isFetching: boolean;
}

const AddressSearch: FC<AddressSearchProps> = ({ query, setQuery, fetch, handleClear, isFetching }) => {
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void fetch(1, query);
  };

  return (
    <form onSubmit={handleSearch} className='flex flex-grow justify-center items-center'>
      <Input aria-label='Search' placeholder='Type...' type='search' value={query} onValueChange={setQuery} onClear={handleClear} startContent={<FaSearch />} size='md' className='max-w-screen-2xl' isDisabled={isFetching} isClearable />
    </form>
  );
};
export default AddressSearch;
