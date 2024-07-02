import React, {useState} from "react";

const Search = ({handleSearchClick}) => {

    const [ searchTerm, setSearchTerm ] = useState(null);

    return <>
        <label htmlFor="search" className="screen-reader-text">Search</label>
        <input
            type="text"
            id="search"
            name="search"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={(e) => handleSearchClick(searchTerm)} className="button">Search</button>
    </>
}

export default Search;