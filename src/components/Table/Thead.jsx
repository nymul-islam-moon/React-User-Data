import React from "react";

const Thead = ({columns}) => {
    return <>
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
    </>
}

export default Thead;