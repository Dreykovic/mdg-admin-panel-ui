import { ErrorMessage, Field, Form, Formik } from 'formik';

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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
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
                <label htmlFor="documentNumber" className="form-label fw-bold">
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
            <button type="button" className="btn btn-outline-secondary">
              Cancel
            </button>
            <LoadingButton
              icon={<i className="icofont-check-circled me-1"></i>}
              text=" Confirm Restock"
              isLoading={isSubmitting}
              classes="btn btn-success"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default RestockForm;
