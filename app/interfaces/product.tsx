type ProductResponse = {
  id: string;
  type: string;
  attributes: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    thumbnail: ProductThumbnail;
    images: [ProductImage];
  };
};

type GetProductResponse = {
  data: ProductResponse;
}

// General Interface

// ProductResponse => Thumbnail
type ProductThumbnail = {
  url: string;
  full: string;
};
// ProductResponse => Images
type ProductImage = {
  thumbnail: string;
  full: string;
};

// Product => Page
type ProductPageProps = {
  params: {
    id: string;
  };
};

// Product => productCard
type ProductCardProps = {
  product: ProductResponse;
};

type ProductImagesProps = {
  title: string;
  mainImage: string;
  images: [ProductImage];
};

export type {
  ProductResponse,
  GetProductResponse,
  ProductPageProps,
  ProductCardProps,
  ProductImagesProps,
};
