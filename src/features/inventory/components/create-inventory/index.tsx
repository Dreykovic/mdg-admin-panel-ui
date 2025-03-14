import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import { Card, Button, Tabs, Tab, Badge } from 'react-bootstrap';
import {
  Save,
  XCircle,
  BoxSeam,
  Archive,
  CurrencyDollar,
  ClockHistory,
} from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingButton from '@/components/ui/buttons/loading-button';
import { useInventoryForm } from '@/features/inventory/hooks/use-inventory-form';
import { authRoutesConfig } from '@/router/config';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/slice/page-slice';
import { formatCurrency } from '@/utils/format';

const InventoryCreateForm = ({ sku }: { sku: string }) => {
  const navigate = useNavigate();
  const handleClose = () => navigate(authRoutesConfig.products.path);

  const { initialValues, validationSchema, handleSubmit, warehouses } =
    useInventoryForm(handleClose, sku as string);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageName({ name: 'add-inventory', group: 'goods' }));
  }, [dispatch]);

  // Définition des champs par catégorie
  const quantityFields = [
    {
      name: 'quantity',
      label: 'Current Quantity',
      hint: 'Total quantity of this item',
      required: true,
    },
    {
      name: 'availableQuantity',
      label: 'Available Quantity',
      hint: 'Items ready for immediate sale or use',
      required: false,
    },
    {
      name: 'minimumQuantity',
      label: 'Minimum Quantity',
      hint: 'Absolute minimum quantity to maintain',
      required: false,
    },
    {
      name: 'safetyStockLevel',
      label: 'Safety Stock Level',
      hint: 'Buffer stock to prevent stockouts',
      required: false,
    },
  ];

  const reorderFields = [
    {
      name: 'reorderThreshold',
      label: 'Reorder Threshold',
      hint: 'Minimum quantity before reordering',
      required: true,
    },
    {
      name: 'reorderQuantity',
      label: 'Reorder Quantity',
      hint: 'How many to order when below threshold',
      required: true,
    },
    {
      name: 'leadTimeInDays',
      label: 'Lead Time (Days)',
      hint: 'Expected days between order and receipt',
      required: false,
    },
    {
      name: 'economicOrderQuantity',
      label: 'Economic Order Quantity',
      hint: 'Optimal order quantity based on costs',
      required: false,
    },
  ];

  const costFields = [
    {
      name: 'unitCost',
      label: 'Unit Cost',
      hint: 'Cost per unit for valuation',
      required: false,
    },
  ];

  const valuationMethods = [
    { value: 'FIFO', label: 'First In, First Out (FIFO)' },
    { value: 'LIFO', label: 'Last In, First Out (LIFO)' },
    { value: 'WAC', label: 'Weighted Average Cost (WAC)' },
    { value: 'FEFO', label: 'First Expired, First Out (FEFO)' },
  ];

  const booleanFields = [
    {
      name: 'inStock',
      label: 'In Stock',
      hint: 'Is this product currently in stock?',
      required: true,
    },
    {
      name: 'backOrderable',
      label: 'Back Orderable',
      hint: 'Can customers order when out of stock?',
      required: true,
    },
  ];

  const locationFields = [
    {
      name: 'stockLocation',
      label: 'Stock Location',
      hint: 'Specific location within warehouse (e.g., "Aisle 5, Bin 3")',
      required: false,
    },
  ];

  const additionalFields = [
    {
      name: 'notes',
      label: 'Notes',
      hint: 'Additional information about this inventory',
      required: false,
      type: 'textarea',
    },
  ];

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, resetForm, touched, errors }) => (
            <Form>
              <Tabs defaultActiveKey="quantities" className="mb-4">
                <Tab
                  eventKey="quantities"
                  title={
                    <span>
                      <BoxSeam className="me-2" />
                      Quantities
                    </span>
                  }
                >
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h5 className="mb-3 text-primary border-bottom pb-2">
                        Current Stock
                      </h5>
                      {quantityFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className="form-label fw-semibold"
                          >
                            {field.label}{' '}
                            {field.required && (
                              <span className="text-danger">*</span>
                            )}
                          </label>
                          <Field
                            name={`inventoryMetaData.${field.name}`}
                            type="number"
                            min="0"
                            step="0.01"
                            className={`form-control`}
                          />
                          <small className="text-muted d-block mt-1">
                            {field.hint}
                          </small>
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="col-md-6">
                      <h5 className="mb-3 text-primary border-bottom pb-2">
                        Reorder Parameters
                      </h5>
                      {reorderFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className="form-label fw-semibold"
                          >
                            {field.label}{' '}
                            {field.required && (
                              <span className="text-danger">*</span>
                            )}
                          </label>
                          <Field
                            name={`inventoryMetaData.${field.name}`}
                            type="number"
                            min="0"
                            step={
                              field.name === 'leadTimeInDays' ? '1' : '0.01'
                            }
                            className={`form-control`}
                          />
                          <small className="text-muted d-block mt-1">
                            {field.hint}
                          </small>
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>

                <Tab
                  eventKey="cost"
                  title={
                    <span>
                      <CurrencyDollar className="me-2" />
                      Costs & Valuation
                    </span>
                  }
                >
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h5 className="mb-3 text-primary border-bottom pb-2">
                        Cost Information
                      </h5>
                      {costFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className="form-label fw-semibold"
                          >
                            {field.label}{' '}
                            {field.required && (
                              <span className="text-danger">*</span>
                            )}
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <Field
                              name={`inventoryMetaData.${field.name}`}
                              type="number"
                              min="0"
                              step="0.01"
                              className={`form-control `}
                            />
                          </div>
                          <small className="text-muted d-block mt-1">
                            {field.hint}
                          </small>
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      ))}

                      <div className="mb-3">
                        <label
                          htmlFor="inventoryMetaData.valuationMethod"
                          className="form-label fw-semibold"
                        >
                          Valuation Method
                        </label>
                        <Field
                          name="inventoryMetaData.valuationMethod"
                          as="select"
                          className="form-select"
                        >
                          {valuationMethods.map((method) => (
                            <option key={method.value} value={method.value}>
                              {method.label}
                            </option>
                          ))}
                        </Field>
                        <small className="text-muted d-block mt-1">
                          Method used for inventory valuation
                        </small>
                        <ErrorMessage
                          name="inventoryMetaData.valuationMethod"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      {values.inventoryMetaData?.unitCost &&
                      values.inventoryMetaData?.quantity ? (
                        <div className="border rounded p-3 bg-light mb-4">
                          <h5 className="mb-3 text-primary">
                            Valuation Preview
                          </h5>
                          <p className="mb-2">
                            <strong>Unit Cost:</strong>{' '}
                            {formatCurrency(values.inventoryMetaData.unitCost)}
                          </p>
                          <p className="mb-2">
                            <strong>Total Quantity:</strong>{' '}
                            {values.inventoryMetaData.quantity}
                          </p>
                          <p className="mb-2">
                            <strong>Total Value:</strong>{' '}
                            <span className="text-success fw-bold">
                              {formatCurrency(
                                values.inventoryMetaData.unitCost *
                                  values.inventoryMetaData.quantity,
                              )}
                            </span>
                          </p>
                          <hr />
                          <p className="mb-0 text-muted small">
                            <strong>Valuation Method:</strong>{' '}
                            {values.inventoryMetaData.valuationMethod || 'FIFO'}
                          </p>
                        </div>
                      ) : (
                        <div className="alert alert-info">
                          <p className="mb-0">
                            Enter unit cost and quantity to see valuation
                            preview
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab>

                <Tab
                  eventKey="location"
                  title={
                    <span>
                      <Archive className="me-2" />
                      Warehouse & Status
                    </span>
                  }
                >
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h5 className="mb-3 text-primary border-bottom pb-2">
                        Storage Location
                      </h5>

                      <div className="mb-3">
                        <label
                          htmlFor="warehouseId"
                          className="form-label fw-semibold"
                        >
                          Warehouse <span className="text-danger">*</span>
                        </label>
                        <Field
                          name="warehouseId"
                          as="select"
                          className={`form-select ${
                            touched.warehouseId && errors.warehouseId
                              ? 'is-invalid'
                              : ''
                          }`}
                        >
                          <option value="">Select Warehouse</option>
                          {warehouses?.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                              {warehouse.name}{' '}
                              {warehouse.isDefault && '(Default)'}
                            </option>
                          ))}
                        </Field>
                        <small className="text-muted d-block mt-1">
                          Where this inventory is stored
                        </small>
                        <ErrorMessage
                          name="warehouseId"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      {locationFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className="form-label fw-semibold"
                          >
                            {field.label}{' '}
                            {field.required && (
                              <span className="text-danger">*</span>
                            )}
                          </label>
                          <Field
                            name={`inventoryMetaData.${field.name}`}
                            type="text"
                            className={`form-control`}
                          />
                          <small className="text-muted d-block mt-1">
                            {field.hint}
                          </small>
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="col-md-6">
                      <h5 className="mb-3 text-primary border-bottom pb-2">
                        Status Settings
                      </h5>

                      {booleanFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className="form-label fw-semibold"
                          >
                            {field.label}{' '}
                            {field.required && (
                              <span className="text-danger">*</span>
                            )}
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
                            className="invalid-feedback"
                          />
                        </div>
                      ))}

                      {additionalFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className="form-label fw-semibold"
                          >
                            {field.label}{' '}
                            {field.required && (
                              <span className="text-danger">*</span>
                            )}
                          </label>
                          <Field
                            name={`inventoryMetaData.${field.name}`}
                            as="textarea"
                            rows="3"
                            className={`form-control`}
                          />
                          <small className="text-muted d-block mt-1">
                            {field.hint}
                          </small>
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>

                <Tab
                  eventKey="overview"
                  title={
                    <span>
                      <ClockHistory className="me-2" />
                      Overview
                    </span>
                  }
                >
                  <div className="row mt-3">
                    <div className="col-12">
                      <h5 className="mb-3 text-primary border-bottom pb-2">
                        Inventory Status Overview
                      </h5>

                      <div className="card bg-light">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                                  <span className="fw-semibold">
                                    Current Quantity:
                                  </span>
                                  <span
                                    className={`badge ${values.inventoryMetaData?.quantity > 0 ? 'bg-success' : 'bg-danger'}`}
                                  >
                                    {values.inventoryMetaData?.quantity || 0}
                                  </span>
                                </li>
                                <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                                  <span className="fw-semibold">
                                    Available Quantity:
                                  </span>
                                  <span
                                    className={`badge ${
                                      (values.inventoryMetaData
                                        ?.availableQuantity ||
                                        values.inventoryMetaData?.quantity ||
                                        0) > 0
                                        ? 'bg-success'
                                        : 'bg-danger'
                                    }`}
                                  >
                                    {values.inventoryMetaData
                                      ?.availableQuantity ||
                                      values.inventoryMetaData?.quantity ||
                                      0}
                                  </span>
                                </li>
                                <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                                  <span className="fw-semibold">
                                    Safety Stock Level:
                                  </span>
                                  <span className="badge bg-info">
                                    {values.inventoryMetaData
                                      ?.safetyStockLevel || 0}
                                  </span>
                                </li>
                                <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                                  <span className="fw-semibold">
                                    Reorder Threshold:
                                  </span>
                                  <span className="badge bg-primary">
                                    {values.inventoryMetaData
                                      ?.reorderThreshold || 0}
                                  </span>
                                </li>
                                <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                                  <span className="fw-semibold">
                                    Lead Time:
                                  </span>
                                  <span className="badge bg-secondary">
                                    {values.inventoryMetaData?.leadTimeInDays ||
                                      0}{' '}
                                    days
                                  </span>
                                </li>
                              </ul>
                            </div>

                            <div className="col-md-6">
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                                  <span className="fw-semibold">
                                    Unit Cost:
                                  </span>
                                  <span className="badge bg-dark">
                                    {values.inventoryMetaData?.unitCost
                                      ? formatCurrency(
                                          values.inventoryMetaData.unitCost,
                                        )
                                      : 'Not set'}
                                  </span>
                                </li>
                                <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                                  <span className="fw-semibold">
                                    Total Value:
                                  </span>
                                  <span className="badge bg-dark">
                                    {values.inventoryMetaData?.unitCost &&
                                    values.inventoryMetaData?.quantity
                                      ? formatCurrency(
                                          values.inventoryMetaData.unitCost *
                                            values.inventoryMetaData.quantity,
                                        )
                                      : 'Not available'}
                                  </span>
                                </li>
                                <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                                  <span className="fw-semibold">
                                    Valuation Method:
                                  </span>
                                  <span className="text-primary">
                                    {values.inventoryMetaData
                                      ?.valuationMethod || 'FIFO'}
                                  </span>
                                </li>
                                <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                                  <span className="fw-semibold">Status:</span>
                                  <span>
                                    {values.inventoryMetaData?.inStock ===
                                    'true' ? (
                                      <span className="text-success">
                                        In Stock
                                      </span>
                                    ) : (
                                      <span className="text-danger">
                                        Out of Stock
                                      </span>
                                    )}
                                  </span>
                                </li>
                                <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                                  <span className="fw-semibold">
                                    Back Orderable:
                                  </span>
                                  <span>
                                    {values.inventoryMetaData?.backOrderable ===
                                    'true' ? (
                                      <span className="text-success">Yes</span>
                                    ) : (
                                      <span className="text-danger">No</span>
                                    )}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* Alerts section */}
                          <div className="mt-4">
                            {values.inventoryMetaData?.quantity === 0 && (
                              <div className="alert alert-danger mb-2">
                                <strong>Warning:</strong> You are creating an
                                inventory with zero quantity.
                              </div>
                            )}

                            {values.inventoryMetaData?.availableQuantity <
                              values.inventoryMetaData?.reorderThreshold && (
                              <div className="alert alert-warning mb-2">
                                <strong>Notice:</strong> Available quantity is
                                below reorder threshold.
                                {values.inventoryMetaData?.leadTimeInDays >
                                  0 && (
                                  <div className="mt-1">
                                    Estimated lead time:{' '}
                                    <strong>
                                      {values.inventoryMetaData.leadTimeInDays}{' '}
                                      days
                                    </strong>
                                  </div>
                                )}
                              </div>
                            )}

                            {values.inventoryMetaData?.quantity > 0 &&
                              values.inventoryMetaData?.unitCost > 0 && (
                                <div className="alert alert-success mb-2">
                                  <strong>Ready:</strong> Initial stock of{' '}
                                  {values.inventoryMetaData.quantity} units
                                  worth{' '}
                                  {formatCurrency(
                                    values.inventoryMetaData.unitCost *
                                      values.inventoryMetaData.quantity,
                                  )}
                                  will be recorded.
                                </div>
                              )}

                            {(!values.warehouseId ||
                              values.warehouseId === '') && (
                              <div className="alert alert-secondary mb-2">
                                <strong>Required:</strong> Please select a
                                warehouse.
                              </div>
                            )}

                            {values.inventoryMetaData?.backOrderable ===
                              'true' &&
                              values.inventoryMetaData?.inStock === 'false' && (
                                <div className="alert alert-info mb-2">
                                  <strong>Note:</strong> This product will be
                                  available for back orders when out of stock.
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>

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
                  <LoadingButton
                    isLoading={isSubmitting}
                    variant="primary"
                    classes="d-inline-flex align-items-center"
                    icon={<Save size={16} className="me-2" />}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default InventoryCreateForm;
