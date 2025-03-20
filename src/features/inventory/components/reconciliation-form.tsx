import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';

import ActionConfirmModal from '@/components/ui/action-confirm-modal';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { Inventory } from '@/types/entity';

import { useStockAdjustment } from '../hooks/use-stock-adjustment';
import { StockMovementData } from '../types';
interface ReconciliationFormProps {
  inventory: Inventory;
}
// Reconciliation Form
const ReconciliationForm: React.FC<ReconciliationFormProps> = ({
  inventory,
}) => {
  const initialValues: StockMovementData = {
    inventoryId: inventory.id,
    quantity: 0,
    notes: '',
    isAdjustment: true,
    productId: inventory.productId,
    movementType: 'ADJUSTMENT',
  };
  const { validationSchema, handleSubmit } = useStockAdjustment();
  const formikRef = useRef<any>(null); // Ref pour accéder à Formik de l'extérieur
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Handler déclenché après confirmation du modal
  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    formikRef.current?.submitForm(); // Déclenche le submit de Formik
  };

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            setIsSubmitting(true);
            console.log('values', values);
            await handleSubmit(values);
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {({ values, resetForm }) => (
          <Form>
            <div className="alert alert-info">
              <i className="icofont-info-circle me-2"></i>
              Reconciliation allows inventory adjustment after a physical count.
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="card bg-light mb-3">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">System</h6>
                  </div>
                  <div className="card-body text-center">
                    <h3>{inventory.quantity}</h3>
                    <p className="text-muted mb-0">Units</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card mb-3">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">Physical Count</h6>
                  </div>
                  <div className="card-body">
                    <Field
                      name="quantity"
                      type="number"
                      className="form-control form-control-lg text-center"
                      min={0}
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card mb-3">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">Difference</h6>
                  </div>
                  <div className="card-body text-center">
                    <h3
                      className={
                        values.quantity - inventory.quantity === 0
                          ? 'text-success'
                          : values.quantity - inventory.quantity > 0
                            ? 'text-info'
                            : 'text-danger'
                      }
                    >
                      {values.quantity - inventory.quantity > 0 ? '+' : ''}
                      {values.quantity - inventory.quantity}
                    </h3>
                    <p className="text-muted mb-0">units</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label fw-bold">
                    Explanatory Notes
                  </label>

                  <Field
                    name="notes"
                    as="textarea"
                    rows="3"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="notes"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => resetForm()}
              >
                Cancel
              </button>
              <LoadingButton
                isLoading={isSubmitting}
                variant="primary"
                classes={`btn btn-primary`}
                icon={<i className="icofont-check-circled me-1"></i>}
                text={'Validate Reconciliation'}
                type="button"
                handleClick={() => setShowConfirmModal(true)}
                loadingText="Submitting..."
              />
            </div>

            {/*  */}
          </Form>
        )}
      </Formik>
      {/* Confirmation Modal */}
      <ActionConfirmModal
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        confirmHandler={handleConfirmSubmit}
        isLoading={isSubmitting}
        title="Confirm Stock Movement addition"
        message="Are you sure you want to submit this stock addition?"
        confirmText="Yes, Submit"
        cancelText="No, Cancel"
      />
    </>
  );
};
export default ReconciliationForm;
