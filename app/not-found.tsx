// NextJS
import { Metadata } from "next";

// NextUI
import { Divider } from "@nextui-org/react";

// Icons
import { FcBrokenLink } from "react-icons/fc";

export const metadata: Metadata = {
  title: 'Not Found'
};

const NotFoundPage = () => {
	return (
    <div className="max-w-screen-2xl mx-auto w-full p-4 mb-4 flex flex-col flex-grow justify-center items-center">
      <div className="flex items-center gap-3">
        <h1 className="text-6xl text-center">404</h1>
        <Divider orientation="vertical" className="py-8" />
        <FcBrokenLink className="text-8xl text-current" />
      </div>
      <h2 className="text-5xl">Page not found</h2>
    </div>
  );
};

export default NotFoundPage