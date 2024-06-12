const User = ( props ) => {

    const { id, name, email, phone, address, date, handleDelete } = props;

    const editUrl = `#/edit-user/:${id}`;

    return <>
         <tr key={id}>
             <th scope="row" className="check-column">
                 <input type="checkbox" value={id}/>
             </th>
             <td className="column-name">{ name }</td>
             <td className="column-email">{ email }</td>
             <td className="column-phone">{ phone }</td>
             <td className="column-address">{ address }</td>
             <td className="column-address">{ date }</td>
             <td className="column-actions">
                     <span className="actions">
                         <a className="edit" href={editUrl}>Edit</a> |
                         <button className="delete" onClick={() => handleDelete(id)}>Delete</button>
                     </span>
             </td>
         </tr>
    </>
}

export default User;