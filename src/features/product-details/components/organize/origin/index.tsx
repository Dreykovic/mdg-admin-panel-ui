import { Product } from '@/types/entity';
import { useState } from 'react';
import ProductOriginEditForm from './edit';
import { Supplier } from '../../../../../types/entity';

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
  return (
    <>
      <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
        <div className="d-flex align-items-center flex-fill">
          <span className="avatar lg bg-secondary  text-center d-flex align-items-center justify-content-center">
            <i className="icofont-user fs-5"></i>
          </span>
          <div className="d-flex flex-column ps-3">
            <h6 className=" mb-0 small-14">Origin</h6>
            <span className="fw-bold">{`${product.origin?.country} `}</span>
          </div>
        </div>
        <div className="time-block text-truncate">
          <button
            type="button"
            className="btn p-0"
            onClick={handleUpdateProductOriginModalShow}
          >
            <i className="icofont-edit text-primary fs-6"></i>
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
