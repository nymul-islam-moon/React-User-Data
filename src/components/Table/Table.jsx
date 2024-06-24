import React, { useState } from "react";
import { Link } from "react-router-dom";
import TableNav from "./TableNav";
import Thead from "./Thead";
import Tbody from "./Tbody";
import Pagination from "./Pagination";
const Table = ({ title, columns, data, isLoading, handleDelete, totalData, totalPages, currentPage, handleCurrentPage, currentData, addActionLink, editActionLink }) => {

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

    return (
        <div className="wrap">
            <h1 className="wp-heading-inline">{title}</h1>

            <Link to={addActionLink} className="page-title-action">
                Add {title}
            </Link>

            <TableNav title={title} totalData={totalData} currentData={currentData}/>

            <table className="wp-list-table widefat fixed striped">

                <Thead columns={columns}/>

                <Tbody columns={columns} isLoading={isLoading} data={data} handleDelete={handleDelete} editActionLink={editActionLink}/>
            </table>
            { totalData && totalData > 10 && (
                <Pagination currentPage={currentPage} totalPage={totalPages} nextPage={handleNextPage} previousPage={handlePreviousPage}/>
            ) }
        </div>
    );
}

export default Table;
