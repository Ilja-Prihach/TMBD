
import s from './Pagination.module.css';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className={s.pagination}>
            <button
                className={s.paginationButton}
                disabled={currentPage <= 1}
                onClick={handlePrevious}
            >
                Previous
            </button>

            <span className={s.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>

            <button
                className={s.paginationButton}
                disabled={currentPage >= totalPages}
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    );
};