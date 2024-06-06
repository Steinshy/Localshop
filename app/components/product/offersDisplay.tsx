import { Card, Image } from "@nextui-org/react";
import { imageWidth, imageHeight, ProductsOffers } from "@data/offers";

const OffersDisplay = () => {
  const offersCount = ProductsOffers.length;
  const offers = ProductsOffers.slice();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center justify-center gap-4">
      {Array.from({ length: offersCount }, (_, index) => (
        <Card key={index}>
          <Image removeWrapper width={imageWidth} height={imageHeight} alt="NextUI hero Image" src={offers[index].image} />
        </Card>
      ))}
    </div>
  );
};
export default OffersDisplay;
