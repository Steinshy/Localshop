// Interface => Products | Product/ID/Slug => Page
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
    thumbnail: ProductResponseThumbnail;
    images: [ProductResponseImages];
  };
};

// ProductResponse => Thumbnail
type ProductResponseThumbnail = {
  url: string;
  full: string;
};

// ProductResponse => Images
type ProductResponseImages = {
  thumbnail: string;
  full: string;
};

// Action => GetProductResponse
type getProductResponse = {
  data: ProductResponse;
};

// Product/ID/Slug => Page
type ProductPageProps = {
  params: {
    id: string;
  };
};

// Product => productCard
type ProductCardProps = {
  product: ProductResponse;
};

// Components => ProductImages
type ProductImagesProps = {
  title: string;
  mainImage: string;
  images: [ProductResponseImages];
};

type PreviouslyOrderedProps = {
  productId: number;
}

export type {
  ProductResponse,
  ProductResponseThumbnail,
  ProductResponseImages,
  getProductResponse,
  ProductPageProps,
  ProductCardProps,
  ProductImagesProps,
  PreviouslyOrderedProps
};
