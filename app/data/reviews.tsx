import { generateClamp } from '../utils/helpers';

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
  "Heidi Garcia"
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
  "I'm very impressed with this product."
];

const reviews = () => {
  const reviews = [];
  for (let i = 1; i < 10; i++) {
    reviews.push({
      id: i,
      author: names[i],
      comment: comments[i],
      rating: generateClamp(i, 1, 5),
    });
  }
  return reviews;
}

const reviewsDefaultData = reviews();

export {
  reviewsDefaultData
}
