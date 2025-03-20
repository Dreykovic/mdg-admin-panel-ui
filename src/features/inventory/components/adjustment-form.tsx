import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';

import ActionConfirmModal from '@/components/ui/action-confirm-modal';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { Inventory } from '@/types/entity';

import { useStockAdjustment } from '../hooks/use-stock-adjustment';
import { StockMovementData } from '../types';

interface AdjustmentFormProps {
  inventory: Inventory;
}

// Adjustment Form
const AdjustmentForm: React.FC<AdjustmentFormProps> = ({ inventory }) => {
  const initialValues: StockMovementData = {
    inventoryId: inventory.id,
    quantity: 0,
    documentNumber: '',
    notes: '',
    productId: inventory.productId,
    movementType: 'INCOMING',
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
            await handleSubmit(values);
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {({ values, resetForm }) => (
          <Form>
            <div className="alert alert-warning">
              <i className="icofont-warning-alt me-2"></i>
              Adjustment allows you to manually add or remove units from
              inventory.
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label
                    htmlFor="values.movementType"
                    className="form-label fw-bold"
                  >
                    Adjustment Type
                  </label>
                  <div className="btn-group w-100" role="group">
                    <Field
                      type="radio"
                      id="incoming"
                      name="movementType"
                      className="btn-check"
                      value="INCOMING"
                    />
                    <label
                      className="btn btn-outline-success"
                      htmlFor="incoming"
                    >
                      <i className="icofont-plus-circle me-1"></i>Input
                    </label>

                    <Field
                      type="radio"
                      id="outgoing"
                      name="movementType"
                      className="btn-check"
                      value="OUTGOING"
                    />
                    <label
                      className="btn btn-outline-danger"
                      htmlFor="outgoing"
                    >
                      <i className="icofont-minus-circle me-1"></i>Output
                    </label>
                  </div>
                  <ErrorMessage
                    name="movementType"
                    component="span"
                    className="text-danger mx-2"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="quantity"
                    className="form-label fw-bold required"
                  >
                    Quantity
                  </label>

                  <Field
                    name="quantity"
                    type="number"
                    className="form-control"
                    min={1}
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label fw-bold">
                    Explanatory Notes
                  </label>

                  <Field
                    name="notes"
                    as="textarea"
                    rows="8"
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
                classes={`btn ${values.movementType === 'INCOMING' ? 'btn-success' : 'btn-danger'}`}
                icon={
                  <i
                    className={`icofont-${values.movementType === 'INCOMING' ? 'plus' : 'minus'}-circle me-1`}
                  ></i>
                }
                text={
                  values.movementType === 'INCOMING'
                    ? 'Add to Stock'
                    : 'Remove from Stock'
                }
                type="button"
                handleClick={() => setShowConfirmModal(true)}
                loadingText="Submitting..."
              />
            </div>
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
export default AdjustmentForm;
