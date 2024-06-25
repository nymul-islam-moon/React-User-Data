import React from "react";

const Pagination = (props) => {
    const { currentPage, totalPage, previousPage, nextPage, pageClick } = props;

    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination">
            <ul>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a href="#" className="page-link" onClick={(e) => {
                        e.preventDefault();
                        previousPage();
                    }}>
                        &laquo; Previous
                    </a>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <a href="#" className="page-link" onClick={(e) => {
                            e.preventDefault();
                            pageClick(number);
                        }}>
                            {number}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                    <a href="#" className="page-link" onClick={(e) => {
                        e.preventDefault();
                        nextPage();
                    }}>
                        Next &raquo;
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
