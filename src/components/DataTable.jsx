const DataTable = () => {
    return <>
        <div>
            <table className="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th className="manage-column column-name">Name</th>
                        <th className="manage-column column-email">Email</th>
                        <th className="manage-column column-phone">Phone</th>
                        <th className="manage-column column-address">Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="column-name">Asif</td>
                        <td className="column-email">asif@gmail.com</td>
                        <td className="column-phone">Phone</td>
                        <td className="column-address">Address</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}

export default DataTable;