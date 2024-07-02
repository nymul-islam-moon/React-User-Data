import React from "react";
import BulkActions from "./BulkActions";
import DateFilter from "./DateFilter";
import Search from "./Search";

const TableNav = ({ title, totalData, currentData, bulkAction, handleSearch, handleFilter }) => {

    const handleSearchClick = (data) => {
        handleSearch(data);
    };

    return <>
        <div className="tablenav top">
            <BulkActions bulkAction={bulkAction}/>
            <div className="alignleft actions">
                <DateFilter handleFilter={handleFilter}/>
                <Search handleSearchClick={handleSearchClick}/>
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