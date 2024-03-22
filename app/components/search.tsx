import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

const Search = ({ fetchData, query, setQuery }: { query: string, setQuery: string}) => {  
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
    console.log("Search for:", query);
  }

  return (
      <form onSubmit={handleSubmit} action="#" className="w-full">
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
