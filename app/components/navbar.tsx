'use client';

// React
import { useState, useContext } from "react";

// NextUi - Icon
import Link from "next/link";
import { Link as NextLink, Input } from "@nextui-org/react";
import { DiCssdeck } from "react-icons/di";
import { FaCartArrowDown } from "react-icons/fa";

// Site Config
import { siteConfig } from "../config/site";

// CartProvider
import { CartContext } from "../utils/cartProvider";

export default function Navbar() {
  const cartStore = useContext(CartContext);
  
  // State for the search query
  const [query, setQuery] = useState("");

  // Handles the query change
  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  // Handles the form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission
    console.log("Form submitted");
    console.log(query); // Logs the query to the console

    // TODO: Implement search functionality
  }

  return (
    <div className="flex flex-row gap-3 justify-center items-center p-4 bg-teal-700 text-white">
      <div className="flex flex-col">
        <NextLink as={Link} className="flex justify-start items-center gap-1 text-decoration-none" href="/">
          <DiCssdeck />
          <p className="font-bold text-inherit">{siteConfig.name}</p>
        </NextLink>
      </div>

      <div className="flex flex-col flex-grow">
        <ul className="hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <NextLink
                as={Link}
                color="foreground"
                className="font-semibold hover:text-white/75"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <form onSubmit={handleSubmit} action="#">
          <Input
            aria-label="Search"
            placeholder="Type and press enter..."
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
          />
        </form>
      </div>

      <div className="flex flex-col-grow">
        <a className="relative" href="#" aria-label="Cart">
          <FaCartArrowDown className="text-2xl" />
          {cartStore.data.length > 0 && (
            <div className="absolute h-[20px] w-[20px] flex justify-center items-center bottom-0 right-0 rounded-full bg-red-500 text-sm text-white">
              {cartStore.data.length}
            </div>
          )}
        </a>
      </div>
    </div>
  );
}
