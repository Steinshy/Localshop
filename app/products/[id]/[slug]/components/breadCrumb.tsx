"use client";

// React
import { FC } from "react";

// NextUi
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";

// React icon
import { FaHome } from "react-icons/fa";

const Breadcrumb: FC<{ title: string }> = ({ title }) => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem as={Link} href="/">
          <FaHome />
        </BreadcrumbItem>
        <BreadcrumbItem as={Link} href="/products">
          Products
        </BreadcrumbItem>
        <BreadcrumbItem>{title}</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
