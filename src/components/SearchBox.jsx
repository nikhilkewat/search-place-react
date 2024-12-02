import React, { useRef } from "react";

const SearchBox = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const searchInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const focusSearch = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
      searchInputRef.current.focus();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search cities..."
        ref={searchInputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBox;