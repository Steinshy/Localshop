// React
import { FC } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Link as NextLink } from "@nextui-org/react";

// React icon
import { FaHome } from "react-icons/fa";

interface BreadcrumbProps {
  items: Array<{ title: string; href?: string | undefined }>;
}

const Separator = () => <span className="text-small text-foreground/50">/</span>;

const Breadcrumb: FC<BreadcrumbProps> = ({ items = [] }) => (
  <nav className="flex items-center gap-1 p-2">
    <NextLink as={Link} href="/" className="text-small font-bold text-foreground/75">
      <FaHome />
    </NextLink>

    <Separator />

    {items.map((item, index) => (
      item.href ? (
        <>
          <NextLink
            key={`breadcrumb_${index}`} as={Link} href={item.href}
            className="text-small font-bold text-foreground/75"
          >
            {item.title}
          </NextLink>

          {index < items.length - 1 && <Separator />}
        </>
      ) : (
        <span key={`breadcrumb_${index}`} className="text-small font-bold text-foreground/50">
          {item.title}
        </span>
      )
    ))}
  </nav>
);

export default Breadcrumb;
