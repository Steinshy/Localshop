// React
import { FC } from 'react';

// NextUI
import { Link as NextLink } from '@nextui-org/react';

// Interfaces
import { CategoriesMenuProps } from '@interfaces/categories';

const CategoriesMenu: FC<CategoriesMenuProps> = ({ handleCategoriesMenu, categories }) => {
  if (categories.length === 0) {
    return <p className='text-center text-sm text-foreground/50'>No categories has been found</p>;
  }

  return (
    <>
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
    </>
  );
};
export default CategoriesMenu;
