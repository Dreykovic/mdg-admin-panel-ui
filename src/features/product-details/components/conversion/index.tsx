import { Product } from '@/types/entity';
import ProductSettingCreateForm from './create';
import { useCallback, useState } from 'react';
import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { useDeleteProductConversionSettingMutation } from '@/store/api-slice';
import { showAlert } from '@/components/ui/alerts/alert-slice';

type Props = {
  product: Product;
};
const ProductConversionCard = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const volumeConversion = product.volumeConversion;

  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);
  const [
    showCreateProductConversionModal,
    setShowCreateProductConversionModal,
  ] = useState(false);

  const handleCreateProductConversionModalClose = () =>
    setShowCreateProductConversionModal(false);
  const handleCreateProductConversionModalShow = () =>
    setShowCreateProductConversionModal(true);
  const [deleteProductConversionSetting, { isLoading }] =
    useDeleteProductConversionSettingMutation();
  const handleDeletion = useCallback(async () => {
    try {
      if (volumeConversion) {
        const response = await deleteProductConversionSetting({
          id: volumeConversion.id,
        }).unwrap();

        if (response.success) {
          dispatch(
            showAlert({
              title: 'Success !',
              message: response.message,
            }),
          );
        }
      } else {
        throw new Error('No data provided');
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
  }, [volumeConversion, deleteProductConversionSetting, dispatch]);

  return (
    <>
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mt-5">
            <div className="lesson_name">
              <div className="project-block bg-secondary">
                <i className="icofont-laboratory"></i>
              </div>
              <span className="small text-muted project_name fw-bold"></span>
              <h6 className="mb-0 fw-bold  fs-6  mb-2"> Conversion Settings</h6>
            </div>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              {volumeConversion ? (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleDeleteItemModalShow}
                >
                  <i className="icofont-ui-delete text-primary"></i>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCreateProductConversionModalShow}
                >
                  <i className="icofont-plus text-primary"></i>
                </button>
              )}
            </div>
          </div>
          {volumeConversion ? (
            <div className="row g-2 pt-4">
              <div className="col-4">
                <div className="d-flex align-items-center">
                  <i className="icofont-sand-clock"></i>
                  <span className="ms-2">M1 :</span>
                  <span className="ms-2">{`${volumeConversion.m1} g`}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center">
                  <i className="icofont-sand-clock"></i>
                  <span className="ms-2">M2 :</span>
                  <span className="ms-2">{`${volumeConversion.m2} g`}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center">
                  <i className="icofont-sand-clock"></i>
                  <span className="ms-2">M3 :</span>
                  <span className="ms-2">{`${volumeConversion.m3} g`}</span>
                </div>
              </div>
              <div className="col-12 my-3">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="ms-2">{`Avg`}</span>
                  <span className="ms-2">{`${volumeConversion.avg} grams`}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="dividers-block"></div>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <span className="small bg-secondary  p-1 rounded">Not Set</span>
              </div>
            </>
          )}
        </div>
      </div>
      <ProductSettingCreateForm
        show={showCreateProductConversionModal}
        handleClose={handleCreateProductConversionModalClose}
        productId={product.id}
      />{' '}
      <DeletionConfirmModal
        show={showDeleteItemModal}
        handleClose={handleDeleteItemModalClose}
        isLoading={isLoading}
        deleteHandler={handleDeletion}
      />
    </>
  );
};

export default ProductConversionCard;
