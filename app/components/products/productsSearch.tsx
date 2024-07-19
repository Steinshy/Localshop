// React
import { FC } from 'react';

// NextUI
import { Input } from '@nextui-org/react';

// Icons
import { FaSearch } from 'react-icons/fa';

// Utils
import { capitalize, unslug } from '@utils/helpers';

interface ProductsSearchProps {
  query: string;
  setQuery: (value: string) => void;
  handleSearch: (e: { preventDefault: () => void }) => void;
  handleClear: () => void;
  isFetching: boolean;
  categorySlug?: string;
}

const ProductsSearch: FC<ProductsSearchProps> = ({ query, setQuery, handleSearch, handleClear, isFetching, categorySlug }) => {
  if (categorySlug) return null;

  return (
    <form onSubmit={handleSearch} className='flex justify-center items-center px-2 mb-4'>
      <Input
        aria-label='Search'
        placeholder={`Search a product${categorySlug ? ` in ${capitalize(unslug(categorySlug))}` : ''}...`}
        type='search'
        value={query}
        onValueChange={setQuery}
        onClear={handleClear}
        startContent={<FaSearch />}
        size='md'
        className='max-w-screen-2xl'
        isDisabled={isFetching}
        isClearable
      />
    </form>
  );
};

export default ProductsSearch;
