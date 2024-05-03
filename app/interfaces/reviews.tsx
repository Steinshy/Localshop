type ReviewProps = {
  review: {
    id: number;
    avatar: string;
    author: string;
    comment: string;
    rating: number;
  };
};

type StarsReviewsProps = {
  rating: number;
};

export type { ReviewProps, StarsReviewsProps };
