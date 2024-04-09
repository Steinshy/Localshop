import { Card, Image } from "@nextui-org/react";

const OffersDisplay = () => {

  const offers = [
    {
      id: 1,
      image: "https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F903%2Foffer-4.png&w=1200&q=75",
    },
    {
      id: 2,
      image: "https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F904%2Foffer-3.png&w=1200&q=75",
    },
    {
      id: 3,
      image: "https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F905%2Foffer-2.png&w=1200&q=75",
    },
    {
      id: 4,
      image: "https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F906%2Foffer-1.png&w=1200&q=75",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center justify-center gap-4">
      {
        offers.map((offer) => (
          <Card key={offer.id}>
            <Image
              removeWrapper
              width={300}
              height={300}
              alt="NextUI hero Image"
              src={offer.image}
            />
          </Card>
        ))
      }
    </div>
  );
};
export default OffersDisplay;
