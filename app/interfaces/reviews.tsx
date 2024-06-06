type AuthorProps = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: {
    small: string;
  };
};

type ReviewProps = {
  id: string;
  attributes: {
    title: string;
    body: string;
    rating: number;
    createdAt: string;
    author: AuthorProps;
  };
};

type StarsReviewsProps = {
  rating: number;
};

export type { ReviewProps, StarsReviewsProps };
