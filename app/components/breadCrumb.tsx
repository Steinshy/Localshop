"use client";

// Next Navigation
import { usePathname } from "next/navigation";

// NextUi
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

// Interface - Utils
import { BreadcrumbProps } from "../utils/site";

const Breadcrumb: React.FC<BreadcrumbProps> = ({ id }) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path, index) => path && index !== 2);

  return (
    <Breadcrumbs>
      {pathNames.map((path, index) => (
        <BreadcrumbItem key={`${id}-${index}`}>
          {path}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}

export default Breadcrumb;
