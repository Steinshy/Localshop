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

// ProductReviewsProps
export type ReviewResponse = {
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

// Components => Product => ProductReviews
export type ProductReviewProps = {
  review: ReviewResponse;
};

// Components => Product => ReviewsStars
export type ReviewsStarsProps = {
  rating: number;
};
