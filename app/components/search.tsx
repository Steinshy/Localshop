import { useState } from "react";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  
  // Handles the form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission
    // TODO: Implement search functionality
  };

  // State for the search query
  const [query, setQuery] = useState("");

  // Handles the query change
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value || "");
  };

  return (
    <form onSubmit={handleSubmit} action="#">
      <Input
        aria-label="Search"
        placeholder="Type and press enter..."
        type="search"
        value={query}
        onChange={handleQueryChange}
        startContent={<FaSearch />}
      />
    </form>
  );
};
export default Search;
