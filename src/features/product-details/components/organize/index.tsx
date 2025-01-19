import { Product } from '@/types/entity';
import React from 'react';
import ProductOrganizeCategory from './category';
import ProductOrganizeSupplier from './supplier';
import ProductOrganizeOrigin from './origin';

type Props = {
  product: Product;
};

const ProductOrganizeCard = ({ product }: Props) => {
  return (
    <>
      <div className="card shadow">
        <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
          <h6 className="mb-0 fw-bold ">Organize</h6>
        </div>
        <div className="card-body">
          <div className="flex-grow-1">
            <ProductOrganizeCategory product={product} />
            <ProductOrganizeSupplier product={product} />
            <ProductOrganizeOrigin product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOrganizeCard;
