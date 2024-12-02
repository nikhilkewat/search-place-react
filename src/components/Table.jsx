import React, { useCallback } from "react";

const Table = ({ cities, loading, currentPage, itemsPerPage = 3 }) => {

    // const displayedCities = cities.slice(0, itemsPerPage);

    const displayedCities = useCallback(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = Number(start) + Number(itemsPerPage);
        console.log("START", start, end);
        return cities.slice(start, end);
    }, [cities, currentPage, itemsPerPage]);



    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (cities.length === 0) {
        return (
            <div className="table-placeholder">
                Start searching or no results found.
            </div>
        );
    }

    return (
        <table className="results-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Place Name</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                {displayedCities().map((city, index) => (
                    <tr key={index}>
                        <td>{((currentPage-1) * itemsPerPage) + index + 1}</td>
                        <td>{city.name}</td>
                        <td className="flag">
                            {city.country}{" "}
                            <img
                                src={`https://flagsapi.com/${city.countryCode}/flat/32.png`}
                                alt={city.country}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;