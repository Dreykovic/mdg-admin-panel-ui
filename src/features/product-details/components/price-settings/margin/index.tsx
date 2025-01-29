import { Product } from '@/types/entity';
import { useState } from 'react';
import ProductMarginEditForm from './edit';

type Props = {
  product: Product;
};

const ProductPriceMargin = ({ product }: Props) => {
  const [showUpdateProductMarginModal, setShowUpdateProductMarginModal] =
    useState(false);

  const handleUpdateProductMarginModalClose = () =>
    setShowUpdateProductMarginModal(false);
  const handleUpdateProductMarginModalShow = () =>
    setShowUpdateProductMarginModal(true);
  return (
    <>
      <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
        <div className="d-flex align-items-center flex-fill">
          <span className="avatar lg bg-secondary  text-center d-flex align-items-center justify-content-center">
            <i className="icofont-abacus fs-5"></i>
          </span>
          <div className="d-flex flex-column ps-3">
            <h6 className=" mb-0 small-14">Margin Level</h6>
            <span className="fw-bold">{`${product.marginLevel?.name} (${product.marginLevel?.margin}%)`}</span>
          </div>
        </div>
        <div className="time-block text-truncate">
          <button
            type="button"
            className="btn p-0"
            onClick={handleUpdateProductMarginModalShow}
          >
            <i className="icofont-edit text-primary fs-6"></i>
          </button>
        </div>
      </div>
      <ProductMarginEditForm
        show={showUpdateProductMarginModal}
        handleClose={handleUpdateProductMarginModalClose}
        product={product}
      />
    </>
  );
};

export default ProductPriceMargin;
