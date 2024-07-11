// Icons
import { DiCssdeck } from 'react-icons/di';

const Footer = () => (
  <footer className='border-t border-current text-default-100 pb-2'>
    <div className='flex flex-col lg:flex-row justify-center items-center bg-background/25 text-default-100'>
      <DiCssdeck />
      <p className='text-foreground/75 font-semibold text-sm pl-1'>&copy; 2024 Localshop. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
