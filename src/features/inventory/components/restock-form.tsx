import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRef, useState } from 'react';

import ActionConfirmModal from '@/components/ui/action-confirm-modal';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { Inventory } from '@/types/entity';

import { useRestock } from '../hooks/use-restock';

interface RestockFormProps {
  inventory: Inventory;
}
// Restock Form
const RestockForm: React.FC<RestockFormProps> = ({ inventory }) => {
  const { validationSchema, handleSubmit, initialValues } =
    useRestock(inventory);
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
        {({ resetForm }) => (
          <Form>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label fw-bold">
                    Quantity to Restock
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

                  <small className="text-muted">
                    Recommended quantity: {inventory.reorderQuantity}
                  </small>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="documentNumber"
                    className="form-label fw-bold"
                  >
                    Supplier Order #
                  </label>

                  <Field
                    name="documentNumber"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="documentNumber"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label fw-bold">
                    Notes
                  </label>

                  <Field
                    name="notes"
                    as="textarea"
                    rows="5"
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

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
                classes="btn btn-success"
                icon={<i className="icofont-check-circled me-1"></i>}
                text=" Confirm Restock"
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
export default RestockForm;
