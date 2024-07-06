// Interfaces

import { UserResponse } from '@interfaces/user';
import { CartResponse, CartItem, CartCoupon } from '@interfaces/cart';
import { DiscountResponse } from '@interfaces/discount';
import { ProductResponse } from '@interfaces/product';

// defaultProduct => thumbnail
const defaultThumbnail = {
  url: '',
  full: '',
};

// defaultProduct => images
const defaultImages = {
  thumbnail: '',
  full: '',
};

// defaultCart => Discount
const defaultCoupon: DiscountResponse = {
  id: '',
  type: '',

  attributes: {
    id: 0,
    code: '',
    discount: 0,
    expiration: '',
    expired: false,
    createdAt: '',
    updatedAt: '',
  },
};

const defaultCartCoupon: CartCoupon = {
  data: defaultCoupon,
};

// defaultCartItems => product/data
const defaultProduct: ProductResponse = {
  id: '',
  type: '',

  attributes: {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    thumbnail: defaultThumbnail,
    images: [defaultImages],
  },
};

// defaultCart => items
const defaultCartItem: CartItem = {
  id: 0,
  quantity: 0,
  price: 0,
  product: {
    data: defaultProduct,
  },
};

const defaultCart: CartResponse = {
  id: '',
  type: '',

  attributes: {
    id: 0,
    createdAt: '',
    updatedAt: '',
    items: [defaultCartItem],
    totalPrice: 0,
    coupon: defaultCartCoupon,
    finalPrice: 0,
    totalItems: 0,
    totalUniqueItems: 0,
  },
};

// Utils/subProviders
const defaultUser: UserResponse = {
  id: 0,
  type: '',

  attributes: {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    avatar: {
      small: '',
      large: '',
    },
  },
};

// Products/page
const defaultProducts = {
  data: [],
  pagy: {
    page: 0,
    pages: 1,
  },
};

// Components/user/addressModal
const defaultAddress = {
  label: '',
  firstname: '',
  lastname: '',
  phone: 0,
  address: '',
  city: '',
  state: '',
  country: '',
  zip: 0,
  default: false,
};

export { defaultAddress, defaultCart, defaultUser, defaultProducts, defaultCartCoupon, defaultProduct };

// Unused Data Wip
// const chipColor = (status: string) => {
//   switch (status) {
//     case 'Delivered':
//       return 'success';
//     case 'Processing':
//       return 'warning';
//     case 'Canceled':
//       return 'danger';
//     default:
//       return 'default';
//   }
// };

// Unused Data Wip
// const paymentmethods = [
//   {
//     id: 1,
//     label: 'Credit Card',
//     default: true,
//   },
//   {
//     id: 2,
//     label: 'Paypal',
//     default: false,
//   },
//   {
//     id: 3,
//     label: 'Bank Transfer',
//     default: false,
//   },
// ];

// export { chipColor, paymentmethods };
