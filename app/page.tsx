// NextJS
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Localshop'
};

const HomePage = () => (
  <div className="flex flex-col flex-grow justify-center items-center text-center">
    <h1 className="text-5xl">Welcome to Localshop!</h1>

    <p className="text-lg text-center mt-4">
      Localshop is a platform that allows you to buy and sell products from local businesses in your area.
    </p>

    <p className="text-lg text-center">
      We believe that local businesses are the backbone of our communities and we want to help them thrive.
    </p>
  </div>
);

export default HomePage;
