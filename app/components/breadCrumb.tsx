"use client";

// NextUi
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";
// React icon
import { FaHome } from "react-icons/fa";

// Interface - Utils
import { BreadcrumbProps } from "../utils/site";

const Breadcrumb: React.FC<BreadcrumbProps> = ({ id, title }) => {
  // const pathNames = paths.split('/').filter((path, index) => path && index !== 2);
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem as={Link} href="/">
          <FaHome />
        </BreadcrumbItem>
        <BreadcrumbItem as={Link} href="/products">
          Product
        </BreadcrumbItem>
        <BreadcrumbItem>{title}</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
