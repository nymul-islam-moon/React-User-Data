import React, {useState} from "react";
import BulkActions from "./BulkActions";
import DateFilter from "./DateFilter";

const TableNav = ({ title, totalData, currentData, bulkAction, handleSearch, handleFilter }) => {

    const [searchTerm, setSearchTerm] = useState(null);

    const handleSearchClick = () => {
        handleSearch(searchTerm);
    };

    return <>
        <div className="tablenav top">
            <BulkActions bulkAction={bulkAction}/>
            <div className="alignleft actions">

                <DateFilter handleFilter={handleFilter}/>

                <label htmlFor="search" className="screen-reader-text">Search</label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button type="button" onClick={handleSearchClick} className="button">Search</button>

            </div>
            <div className="tablenav-pages one-page">
                <span className="displaying-num">Total {title}s: {currentData} / {totalData}</span>
            </div>
            <br className="clear"/>
        </div>
        <hr className="wp-header-end"/>
    </>
}

export default TableNav;