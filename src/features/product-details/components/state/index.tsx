import { Product } from '@/types/entity';

type Props = {
  product: Product;
};
const ProductStateCard = ({ product }: Props) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h6 className="fw-bold mb-3 text-danger">Danger Zone</h6>
          <div className="flex-grow-1">
            <div className="py-2 d-flex align-items-center border-bottom">
              <div className="d-flex ms-3 align-items-center flex-fill">
                <span className="avatar lg  bg-secondary text-center d-flex align-items-center justify-content-center">
                  <i className="icofont-warning text-danger fs-5"></i>
                </span>
                <div className="d-flex flex-column ps-3">
                  <h6 className="fw-bold mb-0 small-14">Delete Permanently</h6>
                </div>
              </div>
              <button type="button" className="btn btn-outline-danger text-end">
                Delete
              </button>
            </div>
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
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {product.visibility.toLocaleLowerCase()}
                </button>
                <ul className="dropdown-menu border-0 shadow p-3">
                  <li>
                    <a
                      className="dropdown-item py-2 rounded text-success btn btn-sm "
                      href="#"
                    >
                      <i className="icofont-plus-circle me-2 fs-6"></i>
                      Visible
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item py-2 rounded text-warning"
                      href="#"
                    >
                      Draft
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item py-2 text-black rounded"
                      href="#"
                    >
                      Archived
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item py-2 text-secondary rounded"
                      href="#"
                    >
                      Hidden
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductStateCard;
