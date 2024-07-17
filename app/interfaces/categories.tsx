// actionsProducts | interfaces => general | categoriesMenu
export type CategoryProps = {
  id: string;
  type: string;
  attributes: {
    id: number;
    slug: string;
    title: string;
  };
};

export type CategoriesMenuProps = {
  isCategoriesMenuOpen: boolean;
  handleCategoriesMenu: (isOpen: boolean) => void;
  categories: CategoryProps[];
};
