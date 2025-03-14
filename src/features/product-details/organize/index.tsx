import { Product } from '@/types/entity';

import ProductOrganizeCategory from './category';
import ProductOrganizeOrigin from './origin';
import ProductOrganizeSupplier from './supplier';

type Props = {
  product: Product;
};

const ProductOrganizeCard = ({ product }: Props) => {
  return (
    <section className="card shadow" aria-labelledby="organize-section-title">
      <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
        <h2 id="organize-section-title" className="h6 mb-0 fw-bold">
          Organize
        </h2>
      </div>
      <div className="card-body">
        <div className="flex-grow-1">
          <ul className="list-unstyled m-0 p-0">
            <li>
              <ProductOrganizeCategory product={product} />
            </li>
            <li>
              <ProductOrganizeSupplier product={product} />
            </li>
            <li>
              <ProductOrganizeOrigin product={product} />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductOrganizeCard;
