import { useState } from 'react';

import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import { Product } from '@/types/entity';

import { useProductDeletion } from '../hooks/use-product-deletion';

type Props = {
  product: Product;
};

const ProductDeleteBlock = ({ product }: Props) => {
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const { handleDeletion, isLoading } = useProductDeletion(product.id);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);

  const handleConfirmedDeletion = async () => {
    await handleDeletion();
    handleDeleteItemModalClose();
  };

  return (
    <>
      <div
        className="py-2 d-flex align-items-center border-bottom"
        aria-labelledby="delete-product-label"
      >
        <div className="d-flex ms-3 align-items-center flex-fill">
          <span
            className="avatar lg bg-secondary text-center d-flex align-items-center justify-content-center"
            aria-hidden="true"
          >
            <i className="icofont-warning text-danger fs-5"></i>
          </span>
          <div className="d-flex flex-column ps-3">
            <h3 id="delete-product-label" className="h6 fw-bold mb-0 small-14">
              Delete Permanently
            </h3>
            <small className="text-muted">This action cannot be undone</small>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger text-end"
          onClick={handleDeleteItemModalShow}
          aria-label={`Delete product: ${product.name}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              ></span>
              <span>Deleting...</span>
            </>
          ) : (
            <span>Delete</span>
          )}
        </button>
      </div>

      <DeletionConfirmModal
        show={showDeleteItemModal}
        handleClose={handleDeleteItemModalClose}
        isLoading={isLoading}
        deleteHandler={handleConfirmedDeletion}
        title={`Delete ${product.name}`}
        message={`Are you sure you want to permanently delete "${product.name}"? This action cannot be undone.`}
      />
    </>
  );
};

export default ProductDeleteBlock;
