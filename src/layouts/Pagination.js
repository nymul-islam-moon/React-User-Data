import React from "react";

const Pagination = (props) => {
    const { currentPage, totalPage, prePage, nextPage } = props;

    return (
        <nav className="pagination">
            <ul>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a href="#" className="page-link" onClick={(e) => { e.preventDefault(); prePage(); }}>
                        &laquo; Previous
                    </a>
                </li>
                {Array.from({ length: totalPage }, (_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <a href="#" className="page-link" onClick={(e) => { e.preventDefault(); setCurrentPage(index + 1); }}>
                            {index + 1}
                        </a>
                    </li>
                ))}
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
