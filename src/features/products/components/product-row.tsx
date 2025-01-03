import { Product } from '@/types/entity';

interface IProductRowProps {
  product: Partial<Product>;
}

const ProductRow = ({ product }: IProductRowProps) => {
  return (
    <>
      {' '}
      <tr key={product.id}>
        <td>
          <div className="d-flex align-items-center flex-fill">
            <div
              className=" bg-secondary"
              style={{ width: '60px', height: '60px' }}
            >
              <i
                className="icofont-bricks d-flex justify-content-center align-items-center"
                style={{ width: '60px', height: '60px', fontSize: '30px' }}
              ></i>
            </div>
            <div className="d-flex flex-column ps-3">
              <h6 className="fw-bold mb-0 small-14">{product.name}</h6>
              <span className="text-muted"> {product.description}</span>
            </div>
          </div>
        </td>
        <td>{product.category?.name}</td>
        <td>{product.pricePerGramGround}</td>
        <td>{product.pricePerGramWhole}</td>

        <td>...</td>
      </tr>
    </>
  );
};

export default ProductRow;
