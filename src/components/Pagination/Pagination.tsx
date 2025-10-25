// src/components/Pagination/Pagination.tsx
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
  return (
<ReactPaginate
  breakLabel="..."
  nextLabel=">"
  previousLabel="<"
  pageCount={pageCount}
  marginPagesDisplayed={1}
  pageRangeDisplayed={2}
  onPageChange={(event) => onPageChange(event.selected + 1)}
  forcePage={currentPage - 1}
  containerClassName={css.pagination}
  activeClassName={css.active} // ✅ використовує CSS Module
/>
  );
};

export default Pagination;
