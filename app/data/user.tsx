const defaultUser = {
  id: 0,
  type: "",
  addresses: [],
  orders: [],

  attributes: {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    avatar: {
      small: "",
      large: "",
    },
  },
};

const defaultAddress = {
  id: 0,
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
  createdAt: '',
  updatedAt: ''
}

export { defaultUser, defaultAddress };
