// ReviewResponse
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

// actionsReviews | Interfaces => reviews
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

// productReview
export type ProductReviewProps = {
  review: ReviewResponse;
};

// ReviewsStars
export type ReviewsStarsProps = {
  rating: number;
};
