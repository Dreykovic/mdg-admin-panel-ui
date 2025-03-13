import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Save, XCircle } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingButton from '@/components/ui/buttons/loading-button';
import { useInventoryForm } from '@/features/product-stock/inventory/hooks/use-inventory-form';
import { authRoutesConfig } from '@/router/config';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/slice/page-slice';

const InventoryCreatePage = () => {
  const { sku } = useParams();

  const navigate = useNavigate();
  const handleClose = () => navigate(authRoutesConfig.products.path);

  const { initialValues, validationSchema, handleSubmit } = useInventoryForm(
    handleClose,
    sku as string,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageName({ name: 'add-inventory', group: 'goods' }));
  }, [dispatch]);
  // Définition des champs du formulaire
  const numberFields = [
    {
      name: 'quantity',
      label: 'Quantity',
      hint: 'Total quantity of this item',
    },
    {
      name: 'reorderThreshold',
      label: 'Reorder Threshold',
      hint: 'Minimum quantity before reordering',
    },
    {
      name: 'reorderQuantity',
      label: 'Reorder Quantity',
      hint: 'How many to order when below threshold',
    },
    {
      name: 'availableQuantity',
      label: 'Available Quantity',
      hint: 'Items ready for immediate sale',
    },
  ];

  const booleanFields = [
    {
      name: 'inStock',
      label: 'In Stock',
      hint: 'Is this product currently in stock?',
    },
    {
      name: 'backOrderable',
      label: 'Back Orderable',
      hint: 'Can customers order when out of stock?',
    },
  ];

  return (
    <div className="row justify-content-center g-3">
      <div className="col-lg-8 col-md-12">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <h2 className="mb-0">Add Inventory for Product SKU: {sku}</h2>
          </div>
        </div>

        <Card className="shadow-sm">
          <Card.Body>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, resetForm }) => (
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="mb-4 text-primary">Quantity Management</h4>

                      {numberFields.map((field) => (
                        <div className="mb-4" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className="form-label fw-bold required"
                          >
                            {field.label} <span className="text-danger">*</span>
                          </label>
                          <Field
                            name={`inventoryMetaData.${field.name}`}
                            type="number"
                            min="0"
                            className={`form-control`}
                          />

                          <small className="text-muted d-block mt-1">
                            {field.hint}
                          </small>
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="col-md-6">
                      <h4 className="mb-4 text-primary">Status Settings</h4>

                      {booleanFields.map((field) => (
                        <div className="mb-4" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className="form-label fw-bold"
                          >
                            {field.label} <span className="text-danger">*</span>
                          </label>
                          <Field
                            name={`inventoryMetaData.${field.name}`}
                            as="select"
                            className={`form-select`}
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                          <small className="text-muted d-block mt-1">
                            {field.hint}
                          </small>
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      ))}

                      {/* Affichage d'indicateurs basés sur les valeurs saisies */}
                      <div className="alert alert-info mt-4">
                        <strong>Status Overview:</strong>
                        <ul className="mb-0 mt-2">
                          {values.inventoryMetaData?.quantity > 0 && (
                            <li>
                              You have {values.inventoryMetaData.quantity} items
                              in inventory
                            </li>
                          )}
                          {values.inventoryMetaData?.availableQuantity <
                            values.inventoryMetaData?.reorderThreshold && (
                            <li className="text-warning">
                              Available quantity is below reorder threshold
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between border-top pt-4 mt-3">
                    <Button
                      variant="outline-secondary"
                      onClick={() => resetForm()}
                      className="d-flex align-items-center"
                      type="button"
                    >
                      <XCircle size={16} className="me-2" />
                      Reset Form
                    </Button>

                    <div>
                      <Button
                        variant="outline-dark"
                        className="me-2"
                        onClick={handleClose}
                      >
                        Skip
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        className="d-inline-flex align-items-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <LoadingButton isLoading={true} />
                        ) : (
                          <>
                            <Save size={16} className="me-2" />
                            Save Inventory
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default InventoryCreatePage;
