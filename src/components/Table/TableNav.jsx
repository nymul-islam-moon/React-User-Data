import React from "react";

const TableNav = ({ title, totalData, currentData }) => {
    return <>
        <div className="tablenav top">
            <div className="alignleft actions bulkactions">
                <label htmlFor="bulk-action-selector-top" className="screen-reader-text">Select bulk action</label>
                <select name="action" id="bulk-action-selector-top">
                    <option value="-1">Bulk actions</option>
                    <option value="edit" className="hide-if-no-js">Edit</option>
                    <option value="trash">Move to Trash</option>
                </select>
                <input type="submit" id="doaction" className="button action" value="Apply"/>
            </div>
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