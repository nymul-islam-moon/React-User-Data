import React from "react";
import BulkActions from "./BulkActions";

const TableNav = ({ title, totalData, currentData, bulkAction }) => {


    return <>
        <div className="tablenav top">
            <BulkActions bulkAction={bulkAction}/>
            <div className="alignleft actions">
                <label htmlFor="filter-by-date" className="screen-reader-text">Filter by date</label>
                <select name="m" id="filter-by-date">
                    <option value="0">All dates</option>
                    <option value="202406">June 2024</option>
                </select>
                <label className="screen-reader-text" htmlFor="cat">Filter by category</label>
                <select name="cat" id="cat" className="postform">
                    <option value="0">All Categories</option>
                    <option className="level-0" value="1">Uncategorized</option>
                </select>
                <input type="submit" name="filter_action" id="post-query-submit" className="button" value="Filter"/>
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