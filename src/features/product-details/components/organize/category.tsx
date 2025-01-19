import { Product } from '@/types/entity';
import React from 'react';

type Props = {
  product: Product;
};

const ProductOrganizeCategory = ({ product }: Props) => {
  return (
    <>
      <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
        <div className="d-flex align-items-center flex-fill">
          <span className="avatar lg bg-secondary  text-center d-flex align-items-center justify-content-center">
            <i className="icofont-flag fs-5"></i>
          </span>
          <div className="d-flex flex-column ps-3">
            <h6 className=" mb-0 small-14">Category</h6>
            <span className="fw-bold">{product.category.name}</span>
          </div>
        </div>
        <div className="time-block text-truncate">
          <button type="button" className="btn p-0">
            <i className="icofont-edit text-primary fs-6"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductOrganizeCategory;
