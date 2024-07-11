export type getProductCategoriesProps = {
  categories: {
    data: CategoryProps[];
  }
}

export type CategoryProps = {
  id: string;
  type: string;
  attributes: {
    id: number;
    slug: string;
    title: string;
  }
}
