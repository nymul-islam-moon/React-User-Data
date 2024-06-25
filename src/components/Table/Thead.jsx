import React from "react";

const Thead = ({columns}) => {

    const columnKeys = Object.keys(columns);

    return <>
        <thead>
            <tr>
                <td id="cb" className="manage-column column-cb check-column">
                    <input type="checkbox"/>
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