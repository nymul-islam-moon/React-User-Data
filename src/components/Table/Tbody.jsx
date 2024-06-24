import {Link} from "react-router-dom";
import React from "react";

const Tbody = ( {columns, isLoading, data, handleDelete, editActionLink} ) => {
    return <>
        <tbody>
            {isLoading && (
                <tr>
                    <td colSpan="7" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em'}}>
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
                            <Link to={ editActionLink } state={{ item }}>
                                <button className="edit">Edit</button>
                            </Link>
                            &nbsp;|&nbsp;

                            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                        </span>
                    </td>
                </tr>
            ))}
        </tbody>
    </>
}
export default Tbody;