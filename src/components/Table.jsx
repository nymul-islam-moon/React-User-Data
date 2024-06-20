import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from './DeleteButton';

const Table = ({ title, columns, data, isLoading, error, url, handleDelete }) => {

    return (
        <div className="wrap">
            <h1 className="wp-heading-inline">{title}</h1>
            <Link to="" className="page-title-action">
                Add {title}
            </Link>
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
                    <span className="displaying-num">Total {title}s: {data.length}</span>
                </div>
                <br className="clear"/>
            </div>
            <hr className="wp-header-end"/>
            <table className="wp-list-table widefat fixed striped">
                <thead>
                <tr>
                    <td id="cb" className="manage-column column-cb check-column">
                        <input type="checkbox"/>
                    </td>
                    {columns.map((column, index) => (
                        <th key={index} scope="col" className={`manage-column column-${column.toLowerCase()}`}>{column}</th>
                    ))}
                    <th scope="col" className="manage-column column-actions">Actions</th>
                </tr>
                </thead>
                <tbody>
                {isLoading && (
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
                            Loading...
                        </td>
                    </tr>
                )}
                {data.map((item) => (
                    <tr key={item.id}>
                        <th scope="row" className="check-column">
                            <input type="checkbox" value={item.id}/>
                        </th>
                        {columns.map((column) => (
                            <td key={column} className={`column-${column.toLowerCase()}`}>{item[column.toLowerCase()]}</td>
                        ))}
                        <td className="column-actions">
                                <span className="actions">
                                    <Link to={`/edit-user/${item.id}`}>
                                        <button className="edit">Edit</button>
                                    </Link>
                                    &nbsp;|&nbsp;
                                    <DeleteButton
                                        url={url}
                                        itemId={item.id}
                                        onDelete={handleDelete}
                                    />
                                    {/*<button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>*/}
                                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
