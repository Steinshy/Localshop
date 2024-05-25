// React
import { FC } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Link as NextLink } from "@nextui-org/react";

// Icons
import { FaHome } from "react-icons/fa";

// Interface
import { BreadcrumbProps } from "@interfaces/general";

const Separator = () => <span className="text-small text-foreground/50">/</span>;

const Breadcrumb: FC<BreadcrumbProps> = ({ items = [] }) => (
  <nav className="flex items-center gap-1 p-2">
    <NextLink as={Link} href="/" className="text-small font-bold text-foreground/75">
      <FaHome />
    </NextLink>

    <Separator />

    {items.map((item, index) => (
      <span key={`breadcrumb_${index}`} className="flex items-center gap-1">
        {item.href ? (
          <>
            <NextLink as={Link} href={item.href} className="text-small font-bold text-foreground/75">
              {item.title}
            </NextLink>

            {index < items.length - 1 && <Separator />}
          </>
        ) : (
          <span className="text-small font-bold text-foreground/50">{item.title}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
