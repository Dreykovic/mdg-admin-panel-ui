import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import { Product } from '@/types/entity';
import { useDeleteProductMutation } from '@/store/api-slice';
import { useCallback, useState } from 'react';
import { showAlert } from '@/components/ui/alerts/alert-slice';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authRoutesConfig } from '@/router/config';

type Props = {
  product: Product;
};

const ProductDeleteBlock = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDeletion = useCallback(async () => {
    try {
      const response = await deleteProduct({
        id: product.id,
      }).unwrap();

      if (response.success) {
        navigate(authRoutesConfig.products.path);
        dispatch(
          showAlert({
            title: 'Success !',
            message: response.message,
          }),
        );
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          title: 'Error !',
          message: 'An error occurred during deletion' + JSON.stringify(error),
          success: false,
        }),
      );
    } finally {
      handleDeleteItemModalClose();
    }
  }, [product.id, deleteProduct, dispatch]);

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
        deleteHandler={handleDeletion}
      />
    </>
  );
};

export default ProductDeleteBlock;
