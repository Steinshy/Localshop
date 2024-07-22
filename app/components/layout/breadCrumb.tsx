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
import { capitalize, unslug } from '@utils/helpers';

const Separator = () => <span className='text-small text-foreground/50'>/</span>;

// Urls where we don't want to see the breadcrumb -> String | Regex
const excludedUrls = ["\\/products\\/(\\w+)-(\\w+)", "\\/products\\/(\\w+)", "\\/order\\/(\\w+)-(\\w+)", "\\/order\\/(\\w+)"];

const Breadcrumb: FC<BreadcrumbProps> = ({ requestUrl }) => {
  const pathName = usePathname(),
        [url, setUrl] = useState<string>(requestUrl || '');

  // Create urls from a split one
  const buildHref = (urls: string[], currentIndex: number): string => {
    let str = '';
    for (let i = 0; i < currentIndex + 1; i++) {
      if (!urls[i].length) continue; // Skip the first empty item -> ''
      str = str + `/${urls[i]}`;
    }
    return str;
  }

  const buildItems = useCallback((): BreadcrumbItems => {
    // Split the url on every '/', '/user/addresses' -> ['', 'user', 'addresses']
    const urls = url?.split('/'), breadCrumbItems: BreadcrumbItems = [];

    // If the split didn`t return anything
    if (!urls?.length) return breadCrumbItems;

    // For every items returned by the split ->['', 'user', 'addresses']
    for (let i = 0; i < urls.length; i++) {
      if (!urls[i].length) continue; // Skip the first empty item -> ''

      // We'll use "home-decoration" as title example here
      // Unslug turns "home-decoration" into -> "home decoration"
      // Capitalize turns "home decoration" into -> "Home Decoration"
      // BuildHref constructs a URL path string by concatenating elements from the urls array up to the specified currentIndex
      // isLast checks if the current index is the last of the loop
      const title = capitalize(unslug(urls[i])), url = buildHref(urls, i), isLast = i === urls.length - 1;
      
      // Build the object with the corresponding variables and push it into the breadcrumbItems array
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

  const testExcludedUrls = (): boolean => {
    for (let i = 0; i < excludedUrls.length; i++) {
      const e = excludedUrls[i], regex = new RegExp(`^${e}$`);
      if (regex.test(url)) return true;
    }
    return false;
  }

  return (
    (items.length > 1 && !testExcludedUrls()) && (
      <nav className='flex items-center gap-1 p-2'>
        <NextLink as={Link} href='/' className='text-small font-bold text-foreground/75'>
          <FaHome />
        </NextLink>

        <Separator />

        {items.map((item, index) => (
          <>
            {item.href ? (
              <NextLink key={`breadcrumb_${index}`} as={Link} href={item.href} className='text-small font-bold text-foreground/75'>
                {item.title}
              </NextLink>
            ) : (
              <span key={`breadcrumb_${index}`} className='text-small font-bold text-foreground/50 truncate text-ellipsis'>{item.title}</span>
            )}
            {index < items.length - 1 && <Separator />}
          </>
        ))}
      </nav>
    )
  );
}

export default Breadcrumb;
