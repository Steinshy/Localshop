// React
import { FC } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Link as NextLink } from '@nextui-org/react';

// Icons
import { DiCssdeck } from 'react-icons/di';

// Interfaces
import { FooterProps } from '@interfaces/general';

const Footer: FC<FooterProps> = ({ categories }) => {
  const links = [{ title: 'Contact', href: '' }];
  const links2 = [
    { title: 'About Us', href: '' },
    { title: 'Sitemap', href: '' },
  ];

  return (
    <footer className='border-t border-current text-default-100 text-sm p-2'>
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-2 justify-center text-foreground mb-4'>
        <section>
          <p className='text-md font-semibold text-center sm:text-start'>Localshop</p>
          <div className='flex flex-col items-center sm:items-start'>
            {links.map((link) => (
              <NextLink
                as={Link}
                key={link.title}
                href={link.href}
                className='text-sm text-foreground/50 hover:text-foreground'
              >
                {link.title}
              </NextLink>
            ))}
          </div>
        </section>

        <section className='col-span-2'>
          <p className='text-md font-semibold text-center sm:text-start'>Categories</p>
          <div className='grid grid-cols-1 sm:grid-cols-4'>
            {categories.map((category) => (
              <NextLink
                as={Link}
                key={category.id}
                href={`/products/${category.attributes.slug}`}
                className='text-sm text-foreground/50 hover:text-foreground justify-center sm:justify-start'
              >
                {category.attributes.title}
              </NextLink>
            ))}
          </div>
        </section>

        <section>
          <p className='text-md font-semibold text-center sm:text-start'>Links</p>
          <div className='flex flex-col items-center sm:items-start'>
            {links2.map((link) => (
              <NextLink
                as={Link}
                key={link.title}
                href={link.href}
                className='text-sm text-foreground/50 hover:text-foreground'
              >
                {link.title}
              </NextLink>
            ))}
          </div>
        </section>
      </div>
      <div className='flex flex-col lg:flex-row justify-center items-center bg-background/25 text-default-100'>
        <DiCssdeck />
        <p className='text-foreground/75 font-semibold text-sm pl-1'>&copy; 2024 Localshop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
