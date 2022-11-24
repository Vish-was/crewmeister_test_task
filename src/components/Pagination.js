import React from 'react'
import ReactPaginate from 'react-paginate'
import PropTypes from 'prop-types';

const Pagination = ({pageCount,handleChangePage}) => {
    return (
        <>
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={handleChangePage}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                containerClassName={"paginationBtns"}
                previousLinkClassName={"previousBtns"}
                lastLinkClassName={"nextBtn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </>
    )
}

export default Pagination
Pagination.propTypes = {
    handleChangePage: PropTypes.func,
    pageCount: PropTypes.number,
  };