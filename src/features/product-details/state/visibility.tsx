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
    default:
      visibilityColor = 'warning';
      visibilityIcon = 'file-alt';
      break;
  }
  visibilityColor = 'primary';

  return (
    <>
      <div className="py-2 d-flex align-items-center border-bottom">
        <div className="d-flex ms-3 align-items-center flex-fill">
          <span className="avatar lg bg-secondary  text-center d-flex align-items-center justify-content-center">
            <i className="icofont-eye fs-5"></i>
          </span>
          <div className="d-flex flex-column ps-3">
            <h6 className="fw-bold mb-0 small-14">Visibility</h6>
          </div>
        </div>

        <div className="dropdown">
          <button
            className={`btn text-${visibilityColor}  `}
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className={`icofont-${visibilityIcon} me-2 fs-6`}></i>
            {product.visibility.toLocaleLowerCase()}
            <i className={`icofont-simple-down ms-2 fs-6`}></i>
          </button>
          <ul className="dropdown-menu border-0 shadow p-3">
            <li>
              <a className="dropdown-item py-2 rounded  btn btn-sm " href="#">
                <i className={`icofont-eye me-2 fs-6`}></i>
                Visible
                {product.visibility === 'VISIBLE' ? (
                  <i
                    className={`icofont-check-circled text-primary ms-2 fs-6`}
                  ></i>
                ) : (
                  ''
                )}
              </a>
            </li>
            <li>
              <a className="dropdown-item py-2 rounded " href="#">
                <i className={`icofont-file-alt me-2 fs-6`}></i>
                Make a Draft
                {product.visibility === 'DRAFT' ? (
                  <i
                    className={`icofont-check-circled text-primary ms-2 fs-6`}
                  ></i>
                ) : (
                  ''
                )}
              </a>
            </li>
            <li>
              <a className="dropdown-item py-2  rounded" href="#">
                <i className={`icofont-archive me-2 fs-6`}></i>
                Archive
                {product.visibility === 'ARCHIVED' ? (
                  <i
                    className={`icofont-check-circled text-primary ms-2 fs-6`}
                  ></i>
                ) : (
                  ''
                )}
              </a>
            </li>
            <li>
              <a className="dropdown-item py-2  rounded" href="#">
                <i className={`icofont-eye-blocked me-2 fs-6`}></i>
                Hide
                {product.visibility === 'HIDDEN' ? (
                  <i
                    className={`icofont-check-circled text-primary ms-2 fs-6`}
                  ></i>
                ) : (
                  ''
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductVisibilityBlock;
