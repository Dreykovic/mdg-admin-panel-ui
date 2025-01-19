import { Product } from '@/types/entity';
import { useState } from 'react';
import ProductSupplierEditForm from './edit';
import { Supplier } from '../../../../../types/entity';

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
  return (
    <>
      <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
        <div className="d-flex align-items-center flex-fill">
          <span className="avatar lg bg-secondary  text-center d-flex align-items-center justify-content-center">
            <i className="icofont-user fs-5"></i>
          </span>
          <div className="d-flex flex-column ps-3">
            <h6 className=" mb-0 small-14">Supplier</h6>
            <span className="fw-bold">{`${product.supplier?.name} `}</span>
          </div>
        </div>
        <div className="time-block text-truncate">
          <button
            type="button"
            className="btn p-0"
            onClick={handleUpdateProductSupplierModalShow}
          >
            <i className="icofont-edit text-primary fs-6"></i>
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
