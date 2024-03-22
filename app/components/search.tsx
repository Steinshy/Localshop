import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { ProductDataProps } from "../utils/interfaces";

const Search = ({ query, setQuery }: { query: string, setQuery: string}) => {  
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
      <form action="#" className="w-full">
        <Input
          aria-label="Search"
          placeholder="Type and press enter..."
          type="search"
          value={query}
          onChange={handleQueryChange}
          startContent={<FaSearch />}
          size="lg"
        />
      </form>
  );
};
export default Search;
