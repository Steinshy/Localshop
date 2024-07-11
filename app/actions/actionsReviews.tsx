'use server';

// Interface
import { ReviewResponse } from '@interfaces/reviews';
import { PagyProps } from '@interfaces/general';

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
    return { data: {} as { data: ReviewResponse }, error };
  }
};
