// Utils/subProviders
const defaultCart = {
  id: '',
  type: '',

  attributes: {
    id: 0,
    createdAt: '',
    updatedAt: '',
    totalPrice: 0,
    totalItems: 0,
    totalUniqueItems: 0,
    finalPrice: 0,
    items: [],
    coupon: {
      id: '',
      category_id: 0,
      type: '',
      code: '',
      discount: 0,
      expiration: '',
    },
  },
};

// Utils/subProviders
const defaultUser = {
  id: 0,
  type: '',
  addresses: [],
  orders: [],

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

export { defaultCart, defaultUser, defaultProducts, defaultAddress };

// Unused Data Wip
const chipColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'Processing':
      return 'warning';
    case 'Canceled':
      return 'danger';
    default:
      return 'default';
  }
};

// Unused Data Wip
const paymentmethods = [
  {
    id: 1,
    label: 'Credit Card',
    default: true,
  },
  {
    id: 2,
    label: 'Paypal',
    default: false,
  },
  {
    id: 3,
    label: 'Bank Transfer',
    default: false,
  },
];

export { chipColor, paymentmethods };
