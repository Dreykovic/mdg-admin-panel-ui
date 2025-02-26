import { Product } from '@/types/entity';
import { useNavigate } from 'react-router-dom';

interface IProductRowProps {
  product: Partial<Product>;
}

const ProductRow = ({ product }: IProductRowProps) => {
  const navigate = useNavigate();
  return (
    <>
      <tr
        onClick={() =>
          navigate(`/catalog/goods/products/details/${product.id}`)
        }
      >
        <td>
          <div className="d-flex align-items-center flex-fill">
            <div
              className=" bg-secondary"
              style={{ width: '60px', height: '60px' }}
            >
              <i
                className="icofont-honey d-flex justify-content-center align-items-center"
                style={{ width: '60px', height: '60px', fontSize: '30px' }}
              ></i>
            </div>
            <div className="d-flex flex-column ps-3">
              <h6 className="fw-bold mb-0 small-14">{product.name}</h6>
              <span className="text-muted"> {product.description}</span>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <div className="avatar rounded-circle no-thumbnail">
              <i
                className="icofont-bricks d-flex justify-content-center align-items-center"
                style={{ width: '40px', height: '40px', fontSize: '20px' }}
              ></i>
            </div>
            <div className="flex-fill ms-1 text-truncate">
              <span>{product.category?.name}</span>
            </div>
          </div>
        </td>
        <td>{product.quantity}</td>
        <td>{product.pricePerGramGround}</td>
        <td>{product.pricePerGramWhole}</td>
        <td>
          <span
            className={`badge bg-${product.isPublic ? 'light' : 'dark'} ${product.isPublic ? 'text-dark' : ''} `}
          >
            {product.isPublic ? 'Visible' : 'Hidden'}
          </span>
        </td>

        {/* <td>
          <div className="btn-group">
            <button
              type="button"
              className="btn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ...
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu border-0 shadow py-3 px-2">
              <li>
                <a className="dropdown-item py-2 rounded" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item py-2 rounded" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item py-2 rounded" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item py-2 rounded" href="#">
                  Separated link
                </a>
              </li>
            </ul>
          </div>
        </td> */}
      </tr>
    </>
  );
};

export default ProductRow;
