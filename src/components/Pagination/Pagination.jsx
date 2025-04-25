import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, selectFilteredAndSortedAssets } from '../../redux/cryptoSlice';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Pagination.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const { totalPages } = useSelector(selectFilteredAndSortedAssets);
  const currentPage = useSelector(state => state.crypto.filter.page);
  
  const handlePageChange = (page) => {
    dispatch(setPage(page));
    // Scroll to top of table
    window.scrollTo({ top: document.querySelector('.crypto-table').offsetTop - 20, behavior: 'smooth' });
  };
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  
  return (
    <div className="pagination">
      <button 
        className="pagination-btn" 
        disabled={currentPage === 1}
        onClick={handlePrevious}
      >
        <FiChevronLeft /> Previous
      </button>
      
      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>
      
      <button 
        className="pagination-btn" 
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;