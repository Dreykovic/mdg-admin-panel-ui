import { Product } from '@/types/entity';

type Props = {
  product: Product;
};

const ProductVisibilityBlock = ({ product }: Props) => {
  let visibilityColor: string;
  let visibilityIcon: string;

  switch (product.visibility) {
    case 'VISIBLE':
      visibilityColor = 'success';
      visibilityIcon = 'eye';
      break;
    case 'HIDDEN':
      visibilityColor = 'secondary';
      visibilityIcon = 'eye-blocked';
      break;
    case 'ARCHIVED':
      visibilityColor = 'black';
      visibilityIcon = 'archive';
      break;
    case 'DRAFT':
      visibilityColor = 'warning';
      visibilityIcon = 'file-alt';
      break;
    default:
      visibilityColor = 'warning';
      visibilityIcon = 'file-alt';
      break;
  }

  // Override based on current design requirements
  visibilityColor = 'primary';

  const visibilityOptions = [
    { value: 'VISIBLE', label: 'Visible', icon: 'eye' },
    { value: 'DRAFT', label: 'Make a Draft', icon: 'file-alt' },
    { value: 'ARCHIVED', label: 'Archive', icon: 'archive' },
    { value: 'HIDDEN', label: 'Hide', icon: 'eye-blocked' },
  ];

  return (
    <div
      className="py-2 d-flex align-items-center border-bottom"
      aria-labelledby="visibility-label"
    >
      <div className="d-flex ms-3 align-items-center flex-fill">
        <span
          className="avatar lg bg-secondary text-center d-flex align-items-center justify-content-center"
          aria-hidden="true"
        >
          <i className="icofont-eye fs-5"></i>
        </span>
        <div className="d-flex flex-column ps-3">
          <h3 id="visibility-label" className="h6 fw-bold mb-0 small-14">
            Visibility
          </h3>
        </div>
      </div>

      <div className="dropdown">
        <button
          className={`btn text-${visibilityColor} d-flex align-items-center`}
          type="button"
          id="visibilityDropdownButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label={`Change product visibility, currently ${product.visibility.toLowerCase()}`}
        >
          <i
            className={`icofont-${visibilityIcon} me-2 fs-6`}
            aria-hidden="true"
          ></i>
          <span>{product.visibility.toLowerCase()}</span>
          <i className="icofont-simple-down ms-2 fs-6" aria-hidden="true"></i>
        </button>

        <ul
          className="dropdown-menu border-0 shadow p-3"
          aria-labelledby="visibilityDropdownButton"
        >
          {visibilityOptions.map((option) => (
            <li key={option.value}>
              <a
                className="dropdown-item py-2 rounded d-flex align-items-center"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // Add state update logic here
                }}
                aria-current={
                  product.visibility === option.value ? 'true' : 'false'
                }
              >
                <i
                  className={`icofont-${option.icon} me-2 fs-6`}
                  aria-hidden="true"
                ></i>
                <span>{option.label}</span>
                {product.visibility === option.value && (
                  <i
                    className="icofont-check-circled text-primary ms-auto fs-6"
                    aria-hidden="true"
                  ></i>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductVisibilityBlock;
