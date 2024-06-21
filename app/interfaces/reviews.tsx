type ReviewAuthor = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: {
    small: string;
    large: string;
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

type ProductReviewsProps = {
  review: ReviewResponse;
};

type ReviewsStarsProps = {
  rating: number;
};

export type { ReviewResponse, ReviewAuthor, ProductReviewsProps, ReviewsStarsProps };
