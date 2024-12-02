import React, { useState, useEffect, useRef } from "react";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table"
import Pagination from "./components/Pagination";
import fetchCities from "./api/fetchcities";
import "./index.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("")
  const [cities, setCities] = useState([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(1);

  const getCities = async (term, page = 1, itemsLimit = limit) => {
    if (!term) return;

    setLoading(true);
    try {

      const data = await fetchCities({ namePrefix: searchTerm, limit });

      setCities(data?.data || []);
      setTotalPages(Math.ceil(data.data.length / 3) || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);


  const handleLimitChange = (value) => {
    const newLimit = Math.min(10, Math.max(1, parseInt(value || 5)));
    console.log(newLimit)
    setLimit(newLimit);
    getCities(searchTerm, currentPage, newLimit);
  };

  useEffect(() => {

    if (searchTerm)
      getCities(searchTerm, currentPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debounceSearch.trim()) return;
      setLoading(true);

      const data = await fetchCities({
        namePrefix: debounceSearch,
        limit: limit,
      });
      setCities(data?.data || []);
      setLoading(false);
    };

    fetchResults();
  }, [debounceSearch, limit]);

  return (
    <div className="app-container">
      <SearchBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={() => setDebounceSearch(searchTerm)}
      />
      <Table cities={cities} loading={loading} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(val) => setCurrentPage(val)}
          itemsPerPage={itemsPerPage}
          cities={cities}
        />
        <div className="limit-input">
          <label htmlFor="limit">Limit:</label>
          <input
            type="number"
            id="limit"
            value={limit}
            min="1"
            max="10"
            onChange={(e) => handleLimitChange(e.target.value)}
          />

        </div>
        <div className="limit-input">
          <label htmlFor="limit">Items Per Page:</label>
          <input
            type="number"
            id="itemsPerPage"
            value={itemsPerPage}
            min="3"
            max="10"
            onChange={(e) => {
              const value = e.target.value;
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;