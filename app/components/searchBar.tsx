// React
import { FC } from "react";

// NextUI
import { Input } from "@nextui-org/react";

// Icons
import { FaSearch } from "react-icons/fa";

export type searchBarProps = {
  query: string;
  setQuery: (query: string) => void;
  fetch: (page?: number, query?: string) => void;
  isFetching: boolean;
  placeholder?: string;
};

const SearchBar: FC<searchBarProps> = ({ query, setQuery, fetch, isFetching, placeholder = 'Type...' }) => {
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void fetch(1, query);
  };

  const handleClear = () => {
    setQuery('');
    void fetch(1);
  };

  return (
    <form onSubmit={handleSearch} className='flex flex-grow justify-center items-center w-full'>
      <Input aria-label='Search' placeholder={placeholder} type='search' value={query} onValueChange={setQuery} onClear={handleClear} startContent={<FaSearch />} size='md' isDisabled={isFetching} isClearable />
    </form>
  );
};

export default SearchBar;
