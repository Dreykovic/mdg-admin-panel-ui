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
      <div className="py-2 d-flex align-items-center border-bottom">
        <div className="d-flex ms-3 align-items-center flex-fill">
          <span className="avatar lg  bg-secondary text-center d-flex align-items-center justify-content-center">
            <i className="icofont-warning text-danger fs-5"></i>
          </span>
          <div className="d-flex flex-column ps-3">
            <h6 className="fw-bold mb-0 small-14">Delete Permanently</h6>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger text-end"
          onClick={handleDeleteItemModalShow}
        >
          Delete
        </button>
      </div>
      <DeletionConfirmModal
        show={showDeleteItemModal}
        handleClose={handleDeleteItemModalClose}
        isLoading={isLoading}
        deleteHandler={handleConfirmedDeletion}
      />
    </>
  );
};

export default ProductDeleteBlock;
