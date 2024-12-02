import React, { useCallback } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, cities }) => {
  if (cities.length <= 1) return null;

 

  return cities.length > itemsPerPage && (
    <div className="pagination-container">
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage * itemsPerPage >= cities.length}
          onClick={() => onPageChange((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )

  // const pages = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pages.push(
  //     <button
  //       key={i}
  //       onClick={() => onPageChange(i)}
  //       disabled={currentPage === i}
  //     >
  //       {i}
  //     </button>
  //   );
  // }

  //  return <div className="pagination">{pages}</div>;
};

export default Pagination;