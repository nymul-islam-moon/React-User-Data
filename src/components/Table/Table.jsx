import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import TableNav from "./TableNav";
import Thead from "./Thead";
import Tbody from "./Tbody";
import Pagination from "./Pagination";

const Table = ({ title, columns, data, isLoading, handleDelete, totalData, totalPages, currentPage, handleCurrentPage, currentData, addActionLink, editActionLink, isDeleteLoading }) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    
    useEffect(() => {
        setIsAllSelected(data.length > 0 && selectedItems.length === data.length);
    }, [selectedItems, data]);

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems([]);
        } else {
            setSelectedItems(data.map(item => item.id));
        }
    };

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };


    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handleCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handleCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (number) => {
        handleCurrentPage(currentPage = number);
    }

    return (
        <div className="wrap">
            <h1 className="wp-heading-inline">{title}</h1>

            <Link to={addActionLink} className="page-title-action">
                Add {title}
            </Link>

            <TableNav title={title} totalData={totalData} currentData={currentData}/>

            <table className="wp-list-table widefat fixed striped">

                <Thead
                    columns={columns}
                    isAllSelected={isAllSelected}
                    onSelectAll={handleSelectAll}
                />
                <Tbody
                    columns={columns}
                    isLoading={isLoading}
                    data={data}
                    handleDelete={handleDelete}
                    editActionLink={editActionLink}
                    isDeleteLoading={isDeleteLoading}
                    handlePageClick={handlePageClick}
                    selectedItems={selectedItems}
                    onSelectItem={handleSelectItem}
                />
            </table>
            { totalData && totalData > 10 && (
                <Pagination currentPage={currentPage} totalPage={totalPages} nextPage={handleNextPage} previousPage={handlePreviousPage} pageClick={handlePageClick}/>
            ) }
        </div>
    );
}

export default Table;
