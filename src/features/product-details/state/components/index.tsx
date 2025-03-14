import { Product } from '@/types/entity';

import ProductDeleteBlock from './delete';
import ProductVisibilityBlock from './visibility';

type Props = {
  product: Product;
};

const ProductStateCard = ({ product }: Props) => {
  return (
    <section className="card border-danger" aria-labelledby="danger-zone-title">
      <div className="card-body">
        <h2 id="danger-zone-title" className="h6 fw-bold mb-3 text-danger">
          Danger Zone
        </h2>
        <div className="flex-grow-1">
          <ul className="list-unstyled m-0 p-0">
            <li>
              <ProductVisibilityBlock product={product} />
            </li>
            <li>
              <ProductDeleteBlock product={product} />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductStateCard;
