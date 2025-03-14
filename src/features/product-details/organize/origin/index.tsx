import { useState } from 'react';

import { Product } from '@/types/entity';

import ProductOriginEditForm from './edit';

type Props = {
  product: Product;
};

const ProductOrganizeOrigin = ({ product }: Props) => {
  const [showUpdateProductOriginModal, setShowUpdateProductOriginModal] =
    useState(false);

  const handleUpdateProductOriginModalClose = () =>
    setShowUpdateProductOriginModal(false);
  const handleUpdateProductOriginModalShow = () =>
    setShowUpdateProductOriginModal(true);

  const originCountry = product.origin?.country || 'Not specified';

  return (
    <>
      <div
        className="py-2 d-flex align-items-center border-bottom flex-wrap"
        aria-labelledby="origin-label"
      >
        <div className="d-flex align-items-center flex-fill">
          <span
            className="avatar lg bg-secondary text-center d-flex align-items-center justify-content-center"
            aria-hidden="true"
          >
            <i className="icofont-flag fs-5"></i>
          </span>
          <div className="d-flex flex-column ps-3">
            <h3 id="origin-label" className="h6 mb-0 small-14">
              Origin
            </h3>
            <span className="fw-bold">{originCountry}</span>
          </div>
        </div>
        <div className="time-block text-truncate">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary rounded-circle p-2"
            onClick={handleUpdateProductOriginModalShow}
            aria-label={`Edit origin: ${originCountry}`}
          >
            <i className="icofont-edit fs-6" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <ProductOriginEditForm
        show={showUpdateProductOriginModal}
        handleClose={handleUpdateProductOriginModalClose}
        product={product}
      />
    </>
  );
};

export default ProductOrganizeOrigin;
