import { useState } from "react";
import { Link } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { DiCssdeck } from "react-icons/di";
import { FaCartArrowDown } from "react-icons/fa";
import { siteConfig } from "../config/site";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
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
        <Link as={RouterLink} className="flex justify-start items-center gap-1" to="/">
          <DiCssdeck />
          <p className="font-bold text-inherit">{siteConfig.name}</p>
        </Link>
      </div>

      <div className="flex flex-col flex-grow">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <Link
                as={RouterLink}
                color="foreground"
                className="font-semibold hover:text-white/75"
                to={item.href}
              >
                {item.label}
              </Link>
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
        <a href="#" aria-label="Cart">
          <FaCartArrowDown className="text-2xl" />
        </a>
      </div>
    </div>
  );
}
