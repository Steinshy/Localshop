'use server';

// Utils
import { handleError } from '@utils/fetchManager';

// Interface
import { ReviewResponse } from '@interfaces/reviews';
import { PagyProps } from '@interfaces/general';
import { ErrorObj } from '@interfaces/httpUtils';

// Index
import { api } from '@actions/index';

// Product => Review - API - Get
export const getProductReviews = async (value: string) => {
  try {
    const data = await api.get<{ reviews: { data: ReviewResponse[] }; pagy: PagyProps }>(`/products/${value}/reviews`, {
      next: { tags: ['reviews'] },
    });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string)
    return { data: {} as { data: ReviewResponse }, error };
  }
};
