import { Link } from "react-router-dom";
import React from "react";

const Tbody = ({ columns, isLoading, data, handleDelete, editActionLink, isDeleteLoading, selectedItems, onSelectItem }) => {
    // Ensure columns is an array
    const columnValues = Array.isArray(columns) ? columns : Object.values(columns);

    return (
        <tbody>
        { isLoading && (
            <tr>
                <td colSpan={columnValues.length + 2} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
                    Loading...
                </td>
            </tr>
        )}

        { ! isLoading && data.length === 0 && (
            <tr>
                <td colSpan={columnValues.length + 2} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
                    No Data Found
                </td>
            </tr>
        )}

        { data.map( ( item ) => (
            <tr key={item.id}>
                <td scope="row" className="user-checkbox">
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => onSelectItem(item.id)}
                    />
                </td>
                {columnValues.map((column) => (
                    <td key={column} className={`column-${column.toLowerCase()}`}>{item[column.toLowerCase()]}</td>
                ))}
                <td className="column-actions">
                        <span className="actions">
                            <Link to={editActionLink} state={{ item }}>
                                <button className="edit">Edit</button>
                            </Link>
                            &nbsp;|&nbsp;
                            <button className="delete" onClick={() => handleDelete(item.id)}>{isDeleteLoading ? 'Deleting..' : 'Delete'}</button>
                        </span>
                </td>
            </tr>
        ))}
        </tbody>
    );
};

export default Tbody;
