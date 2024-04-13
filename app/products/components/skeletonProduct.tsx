// React
import { FC } from "react";

const SkeletonProduct:FC = () => (
  <div
    role="status"
    className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
  >
    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
  </div>
);

export default SkeletonProduct;
