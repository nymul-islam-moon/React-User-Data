import React from "react";

const Pagination = (props) => {
    const { currentPage, totalPage, previousPage, nextPage } = props;

    return (
        <nav className="pagination">
            <ul>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a href="#" className="page-link" onClick={(e) => { e.preventDefault(); previousPage(); }}>
                        &laquo; Previous
                    </a>
                </li>

                <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                    <a href="#" className="page-link" onClick={(e) => { e.preventDefault(); nextPage(); }}>
                        Next &raquo;
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
