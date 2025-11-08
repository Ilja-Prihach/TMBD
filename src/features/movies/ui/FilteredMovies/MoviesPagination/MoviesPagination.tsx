
import s from './MoviesPagination.module.css';

interface MoviesPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const MoviesPagination = ({
                                     currentPage,
                                     totalPages,
                                     onPageChange
                                 }: MoviesPaginationProps) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const delta = 2; // сколько страниц показывать с каждой стороны от текущей
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        let prev = 0;
        for (const i of range) {
            if (i - prev > 1) {
                rangeWithDots.push('...');
            }
            rangeWithDots.push(i);
            prev = i;
        }

        return rangeWithDots;
    };

    return (
        <div className={s.pagination}>
            <button
                className={s.paginationButton}
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            <div className={s.pageNumbers}>
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`dots-${index}`} className={s.dots}>
                            {page}
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`${s.pageButton} ${
                                currentPage === page ? s.active : ''
                            }`}
                            onClick={() => onPageChange(page as number)}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            <button
                className={s.paginationButton}
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};