type ReviewAuthor = {
  data: {
    id: number;
    type: string;
    attributes: {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      avatar: {
        small: string;
        large: string;
      };
    };
  };
};

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

type getReviewResponse = {
  reviews: {
    data: ReviewResponse[];
  };
};

type ProductReviewsProps = {
  review: ReviewResponse;
};

type ReviewsStarsProps = {
  rating: number;
};

export type { getReviewResponse, ReviewResponse, ProductReviewsProps, ReviewsStarsProps };
