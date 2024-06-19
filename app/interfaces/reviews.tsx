type ReviewAuthorProps = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: {
    small: string;
    large: string;
  };
};

type ReviewDataProps = {
  id: string;
  type: string;
  attributes: {
    id: number;
    title: string;
    body: string;
    rating: number;
    createdAt: string;
    author: ReviewAuthorProps;
  };
};

type ProductReviewsProps = {
  review: ReviewDataProps;
};

export type { ReviewDataProps, ReviewAuthorProps, ProductReviewsProps };
