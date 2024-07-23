import { PreviouslyOrderedInfos, PreviouslyOrderedItem } from './cart';

// actionsProduct | productList | dataProduct | Interfaces => cart | product | products | userOrders
export type ProductResponse = {
  id: string;
  type: string;

  attributes: {
    id: number;
    slug: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    thumbnail: {
      url: string;
      full: string;
    };
    images: [ProductImages];
    category: ProductCategory;
  };
};

// dataProductCategory | Interfaces => product
export type ProductCategory = {
  data: {
    id: string;
    type: string;
    attributes: {
      id: number;
      title: string;
      slug: string;
    };
  };
};

// ProductResponse
export type ProductImages = {
  thumbnail: string;
  full: string;
};

// productPage
export type ProductPageProps = {
  params: {
    productSlug: string;
    categorySlug: string;
  };
};

// productCard
export type ProductCardProps = {
  product: ProductResponse;
};

// productImages
export type ProductImagesProps = {
  title: string;
  mainImage: string;
  images: [ProductImages];
};

// previouslyOrdered
export type PreviouslyOrderedProps = {
  item: PreviouslyOrderedItem;
  infos: PreviouslyOrderedInfos;
};
