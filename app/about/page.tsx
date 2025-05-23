// NextJS
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us'
};

const AboutPage = () => (
  <div className="flex flex-col flex-grow justify-center items-center">
    <h1 className="text-5xl">About Us</h1>
  </div>
);

export default AboutPage;
