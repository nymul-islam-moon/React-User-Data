import React from "react";

const Thead = ({columns, isAllSelected, onSelectAll}) => {

    const columnKeys = Object.keys(columns);

    return <>
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
                    <th key={index} scope="col" className={`manage-column column-${columns[column].toLowerCase()}`}>{column}</th>
                ))}
                <th scope="col" className="manage-column column-actions">Actions</th>
            </tr>
        </thead>
    </>
}

export default Thead;