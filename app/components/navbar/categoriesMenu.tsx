// React
import { FC } from 'react';

// NextUI
import { Link as NextLink } from '@nextui-org/react';

// Interfaces
import { CategoriesMenuProps } from '@interfaces/categories';

const CategoriesMenu: FC<CategoriesMenuProps> = ({ isCategoriesMenuOpen, handleCategoriesMenu, categories }) => {
  if (!isCategoriesMenuOpen) {
    return null;
  }
  return (
    <div
      className={`${
        isCategoriesMenuOpen ? 'translate-y-0 opacity-1' : '-translate-y-full opacity-0 invisible'
      } z-[39] top-[65px] transition-all duration-500 ease-in-out absolute bg-background shadow-lg w-full flex justify-center p-2`}
      onMouseLeave={() => handleCategoriesMenu(false)}
    >
      <div className='grid grid-cols-4 md:grid-cols-6 gap-3 py-3'>
        {categories.map((category) => (
          <div key={category.id}>
            <NextLink
              href={`/products/${category.attributes.slug}`}
              onPress={() => handleCategoriesMenu(false)}
              color='foreground'
            >
              {category.attributes.title}
            </NextLink>
            <p className='text-sm text-foreground/50'>Description</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesMenu;
