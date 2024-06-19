type AuthorProps = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: {
    small: string;
    large: string;
  };
};

type ReviewProps = {
  id: string;
  type: string;
  attributes: {
    id: number;
    title: string;
    body: string;
    rating: number;
    createdAt: string;
    author: AuthorProps;
  };
};

type ReviewDataProps = {
  reviews: {
    data: ReviewProps[];
  };
  pagy: {
    pages: number;
  };
  total: number;
  limit: number;
};

type StarsReviewsProps = {
  rating: number;
};

export type { ReviewProps, ReviewDataProps, StarsReviewsProps };
