import { PagyProps } from '@interfaces/general';

// ReviewAuthor => Avatar
type AuthorAvatar = {
  small: string;
  large: string;
};

// ReviewResponse => Author
type ReviewAuthor = {
  data: {
    id: number;
    type: string;
    attributes: {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      avatar: AuthorAvatar;
    };
  };
};

// getReviewResponse | ProductReviewsProps
type ReviewResponse = {
  id: string;
  type: string;
  attributes: {
    id: number;
    title: string;
    body: string;
    rating: number;
    createdAt: string;
    author: ReviewAuthor;
  };
};

// Actions => getReviewResponse
type getReviewResponse = {
  pagy: PagyProps;
  reviews: {
    data: ReviewResponse[];
  };
};

// Components => Product => ProductReviews
type ProductReviewProps = {
  review: ReviewResponse;
};

// Components => Product => ReviewsStars
type ReviewsStarsProps = {
  rating: number;
};

export type { getReviewResponse, ProductReviewProps, ReviewsStarsProps };
