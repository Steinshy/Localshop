import { useState } from "react";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  
  // Handles the form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission
    // TODO: Implement search functionality
  };

  // State for the search query
  const [query, setQuery] = useState("");

  // Handles the query change
  const handleQueryChange =
    (setQuery: (value: string) => void) => (value: string) => {
      setQuery(value);
    };

  return (
    <form onSubmit={handleSubmit} action="#">
      <Input
        aria-label="Search"
        placeholder="Type and press enter..."
        type="search"
        value={query}
        onChange={(e) => handleQueryChange(setQuery)}
        startContent={<FaSearch />}
      />
    </form>
  );
};
export default Search;
