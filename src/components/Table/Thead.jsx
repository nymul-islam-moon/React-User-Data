import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const Thead = ({ columns, isAllSelected, onSelectAll, handleSort, order, orderBy }) => {
    const columnKeys = Object.keys(columns);
    const orderByColumns = ['id', 'name', 'email', 'phone', 'date'];

    const handleClick = (data) => {
        if (data.toLowerCase() === 'date') {
            handleSort('created_at');
        } else {
            handleSort(data.toLowerCase());
        }
    };

    return (
        <thead>
        <tr>
            <td id="cb" className="check-column">
                <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onSelectAll}
                />
            </td>
            {columnKeys.map((column, index) => (
                <th
                    key={index}
                    scope="col"
                    className={`manage-column column-${columns[column].toLowerCase()}`}
                >
                    {orderByColumns.includes(column.toLowerCase()) ? (
                        <>
                            <a onClick={() => handleClick(column)}>
                                {column}
                            </a>
                            {orderBy.toLowerCase() === column.toLowerCase() || (column.toLowerCase() === 'date' && orderBy === 'created_at') ? (
                                <span className="sorting-arrows">
                                        {order === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
                                    </span>
                            ) : (
                                <span className="sorting-arrows">
                                        <FaArrowDown />
                                        <FaArrowUp />
                                    </span>
                            )}
                        </>
                    ) : (
                        column
                    )}
                </th>
            ))}
            <th scope="col" className="manage-column column-actions">Actions</th>
        </tr>
        </thead>
    );
};

export default Thead;
