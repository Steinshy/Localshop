
// Interfaces
import { ProductResponse } from '@interfaces/product';

// Data
import { defaultProductCategory } from '@data/dataProductCategory';

// defaultProduct => images
const defaultProductImages = {
  thumbnail: '',
  full: '',
};

// defaultCartItems => product/data
export const defaultProduct: ProductResponse = {
  id: '',
  type: '',

  attributes: {
    id: 0,
    slug: '',
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    thumbnail: {
      url: '',
      full: '',
    },
    images: [defaultProductImages],
    category: defaultProductCategory,
  },
};