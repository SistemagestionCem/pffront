interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
      <div className="flex items-center w-full px-4 py-2 mt-4 border rounded-[8px] border-gray-400 focus-within:border-primary-500 transition-colors duration-200">
        <input
          type="text"
          className="flex-1 outline-none"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="ml-2 text-gray-400 fa-solid fa-magnifying-glass"></i>
      </div>
    );
  };
  
  export default SearchBar;