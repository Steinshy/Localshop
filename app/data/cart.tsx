const defaultCart = {
  id: "",
  type: "",

  attributes: {
    id: 0,
    createdAt: "",
    updatedAt: "",
    totalPrice: 0,
    totalItems: 0,
    totalUniqueItems: 0,
    finalPrice: 0,
    items: [],
    coupon: {
      id: "",
      category_id: 0,
      type: "",
      code: "",
      discount: 0,
      expiration: "",
    },
  },
};

export { defaultCart };
