// Interfaces
import { DiscountResponse } from '@interfaces/discount';

// defaultCart => Discount
export const defaultDiscount: DiscountResponse = {
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
