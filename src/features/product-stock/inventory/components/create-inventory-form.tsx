import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';

import LoadingButton from '@/components/ui/buttons/loading-button';
import { useInventoryForm } from '@/features/product-stock/inventory/hooks/use-inventory-form';

const InventoryCreateForm = ({
  show,
  handleClose,
  sku,
}: ModalProps & { sku: string }) => {
  const { initialValues, validationSchema, handleSubmit } = useInventoryForm(
    handleClose,
    sku,
  );

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Add Inventory</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="modal-content">
                <div className="modal-body">
                  {[
                    'quantity',
                    'reorderThreshold',
                    'reorderQuantity',
                    'availableQuantity',
                  ].map((field) => (
                    <div className="mb-3" key={field}>
                      <label
                        htmlFor={`inventoryMetaData.${field}`}
                        className="form-label required"
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <Field
                        name={`inventoryMetaData.${field}`}
                        type="number"
                        className="form-control"
                      />
                      <ErrorMessage
                        name={`inventoryMetaData.${field}`}
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  ))}

                  {['inStock', 'backOrderable'].map((field) => (
                    <div className="mb-3" key={field}>
                      <label
                        htmlFor={`inventoryMetaData.${field}`}
                        className="form-label required"
                      >
                        {field === 'inStock' ? 'In Stock' : 'Backorderable'}
                      </label>
                      <Field
                        name={`inventoryMetaData.${field}`}
                        as="select"
                        className="form-control"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Field>
                      <ErrorMessage
                        name={`inventoryMetaData.${field}`}
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleClose}
              >
                Close
              </button>
              <LoadingButton isLoading={isSubmitting} />
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default InventoryCreateForm;
