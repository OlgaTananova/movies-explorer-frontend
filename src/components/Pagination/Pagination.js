import usePagination from '../../utils/usePagination';
import './Pagination.css';

export default function Pagination({
                                     onPageChange,
                                     totalPageCount,
                                     siblingCount = 1,
                                     currentPage
                                   }) {

  const paginationRange = usePagination({
    totalPageCount, siblingCount, currentPage
  });
  let lastPage = paginationRange[paginationRange.length - 1];

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  function onNext() {
    onPageChange(currentPage + 1);
  }

  function onPrevious() {
    onPageChange(currentPage - 1);
  }

  return (<ul className="pagination-container">
      {/* Left navigation arrow */}
      <button type={'button'}
              className={'pagination-item arrow arrow_left'}
              disabled={currentPage === 1}
              onClick={onPrevious}>
      </button>
    {
      paginationRange.map((pageNumber, index) => {

        if (pageNumber === "DOTS") {
          return <li key={index} className="pagination-item dots">&#8230;</li>
        }
        // Render our Page Pills
        return (
          <li key={index}
            className={`pagination-item ${pageNumber === currentPage ? 'pagination-item_selected' : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })
    }
    <button type={'button'}
            className={'pagination-item arrow arrow-right'}
            disabled={currentPage === lastPage}
            onClick={onNext}>
    </button>

    </ul>)
}
