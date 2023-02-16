import React from 'react';
import {LIMIT} from "../../constant";
import {memo} from "react";

const Pagination = props => {
    const {currentPage, count, onPageClick} = props
    if (count <= LIMIT) {
        return null
    }
    const pageNum = [];
    // 1    16/5
    for (let page = 1; page <= Math.ceil(count / LIMIT); page++) {
        pageNum.push(page) ///1234
    }

    return (
        <nav>
            <ul>
                {
                    pageNum.map(pagenum => {
                        const isCurrentPage = currentPage === pagenum;
                        return (
                            <li key={pagenum} className={isCurrentPage ? "page-item active" : "page-item"}>
                                <button type="button" className="page-link" onClick={() => {
                                    onPageClick(pagenum)
                                }
                                }>
                                    {pagenum}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )

}

export default memo(Pagination)

