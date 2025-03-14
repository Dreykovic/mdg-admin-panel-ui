import { useState } from 'react';

import { Product } from '@/types/entity';

import ProductSupplierEditForm from './edit';

type Props = {
  product: Product;
};

const ProductOrganizeSupplier = ({ product }: Props) => {
  const [showUpdateProductSupplierModal, setShowUpdateProductSupplierModal] =
    useState(false);

  const handleUpdateProductSupplierModalClose = () =>
    setShowUpdateProductSupplierModal(false);
  const handleUpdateProductSupplierModalShow = () =>
    setShowUpdateProductSupplierModal(true);

  const supplierName = product.supplier?.name || 'Not assigned';

  return (
    <>
      <div
        className="py-2 d-flex align-items-center border-bottom flex-wrap"
        aria-labelledby="supplier-label"
      >
        <div className="d-flex align-items-center flex-fill">
          <span
            className="avatar lg bg-secondary text-center d-flex align-items-center justify-content-center"
            aria-hidden="true"
          >
            <i className="icofont-user fs-5"></i>
          </span>
          <div className="d-flex flex-column ps-3">
            <h3 id="supplier-label" className="h6 mb-0 small-14">
              Supplier
            </h3>
            <span className="fw-bold">{supplierName}</span>
          </div>
        </div>
        <div className="time-block text-truncate">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary rounded-circle p-2"
            onClick={handleUpdateProductSupplierModalShow}
            aria-label={`Edit supplier: ${supplierName}`}
          >
            <i className="icofont-edit fs-6" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <ProductSupplierEditForm
        show={showUpdateProductSupplierModal}
        handleClose={handleUpdateProductSupplierModalClose}
        product={product}
      />
    </>
  );
};

export default ProductOrganizeSupplier;
