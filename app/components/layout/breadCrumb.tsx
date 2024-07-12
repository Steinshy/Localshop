'use client';

// React
import { FC, useState, useEffect, useCallback } from 'react';

// NextJS
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// NextUI
import { Link as NextLink } from '@nextui-org/react';

// Icons
import { FaHome } from 'react-icons/fa';

// Interface
import { BreadcrumbProps, BreadcrumbItems } from '@interfaces/general';

// Utils
import { capitalize } from '@utils/helpers';

const Separator = () => <span className='text-small text-foreground/50'>/</span>;

// A FAIRE :
// Liste d'exclusion (ex: products/$categorySlug)
// "Unslug" les titres (ex: Home-decoration)
const Breadcrumb: FC<BreadcrumbProps> = ({ requestUrl }) => {
  const pathName = usePathname(),
        [url, setUrl] = useState<string|undefined>(requestUrl);

  const buildItems = useCallback((): BreadcrumbItems => {
    // Split the url on every '/', '/user/addresses' -> ['', 'user', 'addresses']
    const urls = url?.split('/'), breadCrumbItems: BreadcrumbItems = [];

    // If the split didn`t return anything
    if (!urls?.length) return breadCrumbItems;

    // For every items returned by the split ->['', 'user', 'addresses']
    for (let i = 0; i < urls.length; i++) {
      if (!urls[i].length) continue; // Skip the first empty item -> ''
      // Turns 'user' into -> { title: 'User', href: '/user' }
      const title = capitalize(urls[i]), url = `/${urls[i]}`, isLast = i === urls.length - 1;
      breadCrumbItems.push({ title: title, href: isLast ? '' : url });
    }

    return breadCrumbItems;
  }, [url]);

  const [items, setItems] = useState<BreadcrumbItems>(buildItems());

  useEffect(() => {
    if (pathName === requestUrl || !pathName) return;
    setUrl(pathName);
  }, [pathName, requestUrl]);

  useEffect(() => {
    if(!url) return;
    setItems(buildItems());
  }, [url, buildItems]);

  return (
    items.length > 1 && (
      <nav className='flex items-center gap-1 p-2'>
        <NextLink as={Link} href='/' className='text-small font-bold text-foreground/75'>
          <FaHome />
        </NextLink>

        <Separator />

        {items.map((item, index) => (
          <ul key={`breadcrumb_${index}`} className='flex items-center gap-1'>
            {item.href ? (
              <li>
                <NextLink as={Link} href={item.href} className='text-small font-bold text-foreground/75'>
                  {item.title}
                </NextLink>
              </li>
            ) : (
              <span className='text-small font-bold text-foreground/50'>{item.title}</span>
            )}
            {index < items.length - 1 && <Separator />}
          </ul>
        ))}
      </nav>
    )
  );
}

export default Breadcrumb;
