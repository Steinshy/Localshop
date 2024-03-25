"use client";

import { Card, CardBody, Image } from "@nextui-org/react";

const OffersDisplay = () => {
  return (
    <div className="flex flex-col-4 items-center justify-center gap-4 p-4">
      <Card>
        <CardBody>
          <Image
            width={300}
            height={300}
            alt="NextUI hero Image"
            src="https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F903%2Foffer-4.png&w=1200&q=75"
          />
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Image
            width={300}
            height={300}
            alt="NextUI hero Image"
            src="https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F904%2Foffer-3.png&w=1200&q=75"
          />
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Image
            width={300}
            height={300}
            alt="NextUI hero Image"
            src="https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F905%2Foffer-2.png&w=1200&q=75"
          />
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Image
            width={300}
            height={300}
            alt="NextUI hero Image"
            src="https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F906%2Foffer-1.png&w=1200&q=75"
          />
        </CardBody>
      </Card>
    </div>
  );
};
export default OffersDisplay;
