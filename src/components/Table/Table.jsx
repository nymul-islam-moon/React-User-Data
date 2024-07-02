import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import TableNav from "./TableNav";
import Thead from "./Thead";
import Tbody from "./Tbody";
import Pagination from "./Pagination";

const Table = ({ title, columns, data, isLoading, handleDelete, totalData, totalPages, currentPage, handleCurrentPage, currentData, addActionLink, editActionLink, isDeleteLoading, handleBulkAction, handleSearch, handleFilter }) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    useEffect(() => {
        setIsAllSelected(data.length > 0 && selectedItems.length === data.length);
    }, [selectedItems, data]);

    const handleSelectAll = () => {
        setSelectedItems(isAllSelected ? [] : data.map(item => item.id));
    };
    const handleSelectItem = (id) => {
        setSelectedItems(selectedItems.includes(id) ? selectedItems.filter(itemId => itemId !== id) : [...selectedItems, id]);
    };

    const bulkAction = (actionData) => {
        if (selectedItems.length > 0 && actionData === 'trash') {
            handleBulkAction({ action: actionData, items: selectedItems });
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) handleCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) handleCurrentPage(currentPage - 1);
    };

    const handlePageClick = (number) => {
        handleCurrentPage(number);
    };

    return (
        <div className="wrap">
            <h1 className="wp-heading-inline">{title}</h1>
            <Link to={addActionLink} className="page-title-action">Add {title}</Link>
            <TableNav title={title} totalData={totalData} currentData={currentData} bulkAction={bulkAction} handleSearch={handleSearch} handleFilter={handleFilter}/>
            <table className="wp-list-table widefat fixed striped">
                <Thead columns={columns} isAllSelected={isAllSelected} onSelectAll={handleSelectAll} />
                <Tbody columns={columns} isLoading={isLoading} data={data} handleDelete={handleDelete} editActionLink={editActionLink} isDeleteLoading={isDeleteLoading} selectedItems={selectedItems} onSelectItem={handleSelectItem} />
            </table>
            {totalData > 10 && <Pagination currentPage={currentPage} totalPage={totalPages} nextPage={handleNextPage} previousPage={handlePreviousPage} pageClick={handlePageClick} />}
        </div>
    );
}

export default Table;
