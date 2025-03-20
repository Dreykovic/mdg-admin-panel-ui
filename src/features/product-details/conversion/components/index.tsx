import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import { AppDispatch } from '@/store';
import { useDeleteProductConversionSettingMutation } from '@/services/product';
import { Product } from '@/types/entity';

import ProductSettingCreateForm from './create';

type Props = {
  product: Product;
};

const ProductConversionCard = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const volumeConversion = product.volumeConversion;

  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [
    showCreateProductConversionModal,
    setShowCreateProductConversionModal,
  ] = useState(false);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);

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
              title: 'Success!',
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
          title: 'Error!',
          message:
            'An error occurred during deletion: ' + JSON.stringify(error),
          success: false,
        }),
      );
    } finally {
      handleDeleteItemModalClose();
    }
  }, [volumeConversion, deleteProductConversionSetting, dispatch]);

  // Calculate average if volumeConversion exists
  const getMeasurementAverage = () => {
    if (!volumeConversion) return 0;
    return volumeConversion.avg.toFixed(2);
  };

  return (
    <>
      <div className="card shadow rounded-3 border-0 mb-4">
        <div className="card-header bg-light d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-primary p-2 me-3 text-white">
              <i className="icofont-laboratory"></i>
            </div>
            <h5 className="mb-0 fw-bold">Volume Conversion</h5>
          </div>
          {volumeConversion ? (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={handleDeleteItemModalShow}
              title="Delete conversion settings"
            >
              <i className="icofont-ui-delete me-1"></i>
              Remove
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={handleCreateProductConversionModalShow}
            >
              <i className="icofont-plus me-1"></i>
              Add Conversion
            </button>
          )}
        </div>

        <div className="card-body p-4">
          {volumeConversion ? (
            <>
              <div className="mb-4">
                <small className="text-muted d-block mb-2">
                  Measurement readings (grams to standard volume)
                </small>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="card bg-light h-100">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="icofont-measuring-tape text-primary fs-4"></i>
                          <h6 className="mb-0 ms-2">First Measurement</h6>
                        </div>
                        <span className="d-block text-center fs-3 fw-bold">
                          {volumeConversion.m1}g
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card bg-light h-100">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="icofont-measuring-tape text-primary fs-4"></i>
                          <h6 className="mb-0 ms-2">Second Measurement</h6>
                        </div>
                        <span className="d-block text-center fs-3 fw-bold">
                          {volumeConversion.m2}g
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card bg-light h-100">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="icofont-measuring-tape text-primary fs-4"></i>
                          <h6 className="mb-0 ms-2">Third Measurement</h6>
                        </div>
                        <span className="d-block text-center fs-3 fw-bold">
                          {volumeConversion.m3}g
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-primary text-white">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Average Conversion Rate</h6>
                      <small>Weight to standard volume unit</small>
                    </div>
                    <div className="text-center">
                      <span className="d-block fs-2 fw-bold">
                        {getMeasurementAverage()}
                      </span>
                      <small>grams per standard unit</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="alert alert-info mt-3 mb-0">
                <small>
                  <i className="icofont-info-circle me-2"></i>
                  This conversion rate is used to calculate volume-based pricing
                  and inventory.
                </small>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mb-3">
                <i className="icofont-laboratory fs-1 text-muted"></i>
              </div>
              <h6 className="text-muted mb-3">
                No Conversion Settings Available
              </h6>
              <p className="text-muted small mb-3">
                Volume conversion settings help calculate how many grams equal
                one standard volume unit. This is essential for accurate
                volume-based pricing and inventory management.
              </p>
              <button
                className="btn btn-primary"
                onClick={handleCreateProductConversionModalShow}
              >
                <i className="icofont-plus me-1"></i>
                Add Conversion Settings
              </button>
            </div>
          )}
        </div>
      </div>

      <ProductSettingCreateForm
        show={showCreateProductConversionModal}
        handleClose={handleCreateProductConversionModalClose}
        productId={product.id}
      />

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
