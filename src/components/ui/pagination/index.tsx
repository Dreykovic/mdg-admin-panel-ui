import { useNavigate, useLocation } from 'react-router-dom';
interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      // Modifier la route avec le numéro de page
      navigate({ pathname: location.pathname, search: `?page=${page}` });
      // Déclencher la fonction pour les requêtes (si fournie)
      if (onPageChange) onPageChange(page);
    }
  };

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-end">
        {/* Bouton "Previous" */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {/* Numéros de pages */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ),
        )}

        {/* Bouton "Next" */}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
