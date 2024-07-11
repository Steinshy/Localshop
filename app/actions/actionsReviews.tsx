'use server';

// Interface
import { ReviewResponse } from '@interfaces/reviews';
import { PagyProps } from '@interfaces/general';
import { ErrorObj } from '@interfaces/httpUtils';

// Utils
import { handleError } from '@utils/fetchManager';

// Index
import { api } from '@actions/index';

interface getProductReviewsProps {
  reviews: { data: ReviewResponse[] }; pagy: PagyProps;
}

// Product => Review - API - Get
export const getProductReviews = async (value: string) => {
  try {
    const data = await api.get<getProductReviewsProps>(`/products/${value}/reviews`, {
      next: { tags: ['reviews'] },
    });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {} as getProductReviewsProps, error };
  }
};
