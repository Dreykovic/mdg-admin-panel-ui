import { useState } from 'react';

import { Product } from '@/types/entity';

import ProductCategoryEditForm from './edit';

type Props = {
  product: Product;
};

const ProductOrganizeCategory = ({ product }: Props) => {
  const [showUpdateProductCategoryModal, setShowUpdateProductCategoryModal] =
    useState(false);

  const handleUpdateProductCategoryModalClose = () =>
    setShowUpdateProductCategoryModal(false);
  const handleUpdateProductCategoryModalShow = () =>
    setShowUpdateProductCategoryModal(true);

  const categoryName = product.category?.name || 'Not assigned';

  return (
    <>
      <div
        className="py-2 d-flex align-items-center border-bottom flex-wrap"
        aria-labelledby="category-label"
      >
        <div className="d-flex align-items-center flex-fill">
          <span
            className="avatar lg bg-secondary text-center d-flex align-items-center justify-content-center"
            aria-hidden="true"
          >
            <i className="icofont-bricks fs-5"></i>
          </span>
          <div className="d-flex flex-column ps-3">
            <h3 id="category-label" className="h6 mb-0 small-14">
              Category
            </h3>
            <span className="fw-bold">{categoryName}</span>
          </div>
        </div>
        <div className="time-block text-truncate">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary rounded-circle p-2"
            onClick={handleUpdateProductCategoryModalShow}
            aria-label={`Edit category: ${categoryName}`}
          >
            <i className="icofont-edit fs-6" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <ProductCategoryEditForm
        show={showUpdateProductCategoryModal}
        handleClose={handleUpdateProductCategoryModalClose}
        product={product}
      />
    </>
  );
};

export default ProductOrganizeCategory;
