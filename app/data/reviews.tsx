// Utils
import { generateRandomNumberBetween } from "../utils/helpers";

const names = [
  "John Doe",
  "Jane Doe",
  "Alice Smith",
  "Bob Brown",
  "Charlie Wilson",
  "David Lee",
  "Eve Williams",
  "Frank Miller",
  "Grace Davis",
  "Heidi Garcia",
  "Ivan Rodriguez",
  "Judy Martinez",
  "Mallory Hernandez",
  "Oscar Lopez",
  "Peggy Hill",
  "Sybil Adams",
  "Trent Young",
  "Victor Scott",
  "Walter King",
  "Zoe Baker"
];

const comments = [
  "Great product, I love it!",
  "I'm very satisfied with this product.",
  "This is the best product I've ever bought.",
  "I'm very happy with this product.",
  "I'm very disappointed with this product.",
  "I don't like this product.",
  "This product is not what I expected.",
  "I'm very unhappy with this product.",
  "I'm very pleased with this product.",
  "I'm very impressed with this product.",
  "I'm very surprised with this product.",
  "I'm very delighted with this product.",
  "I'm very relieved with this product.",
  "I'm very excited with this product.",
  "I'm very thrilled with this product.",
  "I'm very grateful with this product.",
  "I'm very thankful with this product.",
  "I'm very appreciative with this product.",
  "I'm very content with this product.",
  "I'm very glad with this product."
];

const generateRandomReview = () => {
  return {
    id: generateRandomNumberBetween(1, 1000),
    author: names[generateRandomNumberBetween(0, names.length - 1)],
    comment: comments[generateRandomNumberBetween(0, comments.length - 1)],
    rating: generateRandomNumberBetween(1, 5),
  };
}

const reviewsDefaultData = Array.from({ length: 5 }, generateRandomReview);

export {
  reviewsDefaultData
}
