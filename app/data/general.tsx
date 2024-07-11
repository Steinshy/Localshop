// Interfaces

import { UserResponse } from '@interfaces/user';
import { CartResponse, CartItemProps } from '@interfaces/cart';
import { DiscountResponse } from '@interfaces/discount';
import { ProductResponse, ProductCategory } from '@interfaces/product';
import { AddressResponse } from '@interfaces/userAddress';
import { OrderResponse, OrderItem } from '@interfaces/userOrder';

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

const defaultProductCategory: ProductCategory = {
  data: {
    id: '',
    type: '',
    attributes: {
      id: 0,
      title: '',
      slug: '',
    },
  },
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

// defaultCartItems => product/data
const defaultProduct: ProductResponse = {
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
    thumbnail: defaultThumbnail,
    images: [defaultImages],
    category: defaultProductCategory,
  },
};

// defaultCart => items
const defaultCartItem: CartItemProps = {
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
    coupon: {
      data: defaultCoupon,
    },
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
const defaultAddress: AddressResponse = {
  id: '',
  type: '',

  attributes: {
    id: 0,
    label: '',
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: 0,
    phone: 0,
    default: false,
    createdAt: '',
    updatedAt: '',
  },
};

const orderItem: OrderItem = {
  id: 0,
  quantity: 0,
  price: 0,
  product: {
    data: defaultProduct,
  },
};

const defaultOrder: OrderResponse = {
  id: 0,
  type: '',
  attributes: {
    id: 0,
    total: 0,
    createdAt: '',
    updatedAt: '',
    items: [orderItem],
    totalItems: 0,
    totalUniqueItems: 0,
    status: '',
    user: {
      data: defaultUser,
    },
  },
};

export { defaultAddress, defaultCart, defaultUser, defaultProducts, defaultProduct, defaultOrder };

// Unused Data Wip
// const chipColor = (status: string) => {
//   switch (status) {
//     case 'Delivered':
//       return 'success',
//     case 'Processing':
//       return 'warning',
//     case 'Canceled':
//       return 'danger',
//     default:
//       return 'default',
//   }
// },

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
// ],

// export { chipColor, paymentmethods },
