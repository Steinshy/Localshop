import { Card, Image } from "@nextui-org/react";
import { IMAGE_WIDTH, IMAGE_HEIGHT, ProductsOffers } from "../../data/offers";

const OffersDisplay = () => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center justify-center gap-4">
      {Array.from(ProductsOffers).map((offer) => (
        <Card key={offer.id}>
          <Image removeWrapper width={IMAGE_WIDTH} height={IMAGE_HEIGHT} alt="NextUI hero Image" src={offer.image} />
        </Card>
      ))}
    </div>
  );
};
export default OffersDisplay;
