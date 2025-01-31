import { Product } from '@/types/entity';
import ProductDeleteBlock from './delete';
import ProductVisibilityBlock from './visibility';

type Props = {
  product: Product;
};
const ProductStateCard = ({ product }: Props) => {
  return (
    <>
      <div className="card border-danger">
        <div className="card-body">
          <h6 className="fw-bold mb-3 text-danger">Danger Zone</h6>
          <div className="flex-grow-1">
            <ProductVisibilityBlock product={product} />
            <ProductDeleteBlock product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductStateCard;
