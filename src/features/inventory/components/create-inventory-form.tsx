import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';

import LoadingButton from '@/components/ui/buttons/loading-button';
import { useInventoryForm } from '@/features/inventory/hooks/use-inventory-form';

const InventoryCreateForm = ({
  show,
  handleClose,
  sku,
}: ModalProps & { sku: string }) => {
  const { initialValues, validationSchema, handleSubmit } = useInventoryForm(
    handleClose,
    sku,
  );

  // Définition des champs du formulaire pour une meilleure maintenance
  const numberFields = [
    'quantity',
    'reorderThreshold',
    'reorderQuantity',
    'availableQuantity',
  ];

  const booleanFields = ['inStock', 'backOrderable'];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Add Inventory for SKU: {sku}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="row">
                <div className="col-md-6">
                  {numberFields.map((field) => (
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
                        min="0"
                        className={`form-control `}
                      />
                      <ErrorMessage
                        name={`inventoryMetaData.${field}`}
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  ))}
                </div>

                <div className="col-md-6">
                  {booleanFields.map((field) => (
                    <div className="mb-3" key={field}>
                      <label
                        htmlFor={`inventoryMetaData.${field}`}
                        className="form-label required"
                      >
                        {field === 'inStock' ? 'In Stock' : 'Back Orderable'}
                      </label>
                      <Field
                        name={`inventoryMetaData.${field}`}
                        as="select"
                        className={`form-select `}
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

                  {/* Status Overview */}
                  <div className="alert alert-info mt-4">
                    <strong>Status Overview:</strong>
                    <ul className="mb-0 mt-2">
                      {values.inventoryMetaData?.quantity > 0 && (
                        <li>
                          You have {values.inventoryMetaData.quantity} items in
                          inventory
                        </li>
                      )}
                      {values.inventoryMetaData?.availableQuantity <
                        values.inventoryMetaData?.reorderThreshold && (
                        <li className="text-warning">
                          Available quantity is below reorder threshold
                        </li>
                      )}
                      {values.inventoryMetaData?.inStock === false && (
                        <li className="text-danger">
                          Product is marked as out of stock
                        </li>
                      )}
                      {values.inventoryMetaData?.backOrderable === true && (
                        <li>Product can be back ordered</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <LoadingButton isLoading={isSubmitting} text="Save Inventory" />
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default InventoryCreateForm;
