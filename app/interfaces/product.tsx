// Interface => Products | Product/ID/Slug => Page
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
    thumbnail: ProductResponseThumbnail;
    images: [ProductResponseImages];
    category: ProductCategory;
  };
};

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

// ProductResponse => Thumbnail
export type ProductResponseThumbnail = {
  url: string;
  full: string;
};

// ProductResponse => Images
export type ProductResponseImages = {
  thumbnail: string;
  full: string;
};

// Product/ID/Slug => Page
export type ProductPageProps = {
  params: {
    productSlug: string;
  };
};

// Product => productCard
export type ProductCardProps = {
  product: ProductResponse;
};

// Components => ProductImages
export type ProductImagesProps = {
  title: string;
  mainImage: string;
  images: [ProductResponseImages];
};

export type PreviouslyOrderedProps = {
  productId: number;
};
