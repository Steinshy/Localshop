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

// Components => Product => ProductReviews
type ProductReviewProps = {
  review: ReviewResponse;
};

// Components => Product => ReviewsStars
type ReviewsStarsProps = {
  rating: number;
};

export type { ReviewResponse, ProductReviewProps, ReviewsStarsProps };
