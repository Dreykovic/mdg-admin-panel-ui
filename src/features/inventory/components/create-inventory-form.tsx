import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
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

  const [activeTab, setActiveTab] = useState('basic');

  // Définition des champs du formulaire pour une meilleure maintenance
  const basicNumberFields = [
    { name: 'quantity', label: 'Quantity', min: 0 },
    { name: 'availableQuantity', label: 'Available Quantity', min: 0 },
    { name: 'reorderThreshold', label: 'Reorder Threshold', min: 0 },
    { name: 'reorderQuantity', label: 'Reorder Quantity', min: 1 },
  ];

  const advancedStockFields = [
    { name: 'minimumQuantity', label: 'Minimum Quantity', min: 0 },
    {
      name: 'maximumQuantity',
      label: 'Maximum Quantity',
      min: 0,
      optional: true,
    },
    { name: 'safetyStockLevel', label: 'Safety Stock Level', min: 0 },
    {
      name: 'economicOrderQuantity',
      label: 'Economic Order Quantity',
      min: 0,
      optional: true,
    },
    {
      name: 'leadTimeInDays',
      label: 'Lead Time (Days)',
      min: 1,
      optional: true,
    },
  ];

  const valuationFields = [
    {
      name: 'unitCost',
      label: 'Unit Cost',
      min: 0,
      step: 0.01,
      optional: true,
    },
    {
      name: 'valuationMethod',
      label: 'Valuation Method',
      type: 'select',
      options: [
        { value: 'FIFO', label: 'First In, First Out (FIFO)' },
        { value: 'LIFO', label: 'Last In, First Out (LIFO)' },
        { value: 'WAC', label: 'Weighted Average Cost (WAC)' },
        { value: 'FEFO', label: 'First Expired, First Out (FEFO)' },
      ],
    },
  ];

  const booleanFields = [
    { name: 'inStock', label: 'In Stock' },
    { name: 'backOrderable', label: 'Back Orderable' },
    { name: 'isActive', label: 'Active' },
  ];

  const otherFields = [
    {
      name: 'stockLocation',
      label: 'Location in Warehouse',
      type: 'text',
      optional: true,
    },
    { name: 'notes', label: 'Notes', type: 'textarea', optional: true },
  ];

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
              {/* Navigation Tabs */}
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
                    onClick={() => setActiveTab('basic')}
                  >
                    Basic Info
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${activeTab === 'advanced' ? 'active' : ''}`}
                    onClick={() => setActiveTab('advanced')}
                  >
                    Advanced
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${activeTab === 'valuation' ? 'active' : ''}`}
                    onClick={() => setActiveTab('valuation')}
                  >
                    Valuation
                  </button>
                </li>
              </ul>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Basic Tab */}
                <div
                  className={`tab-pane ${activeTab === 'basic' ? 'show active' : ''}`}
                >
                  <div className="row">
                    <div className="col-md-6">
                      {basicNumberFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className="form-label required"
                          >
                            {field.label}
                          </label>
                          <Field
                            name={`inventoryMetaData.${field.name}`}
                            type="number"
                            min={field.min}
                            className="form-control"
                          />
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="col-md-6">
                      {booleanFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className="form-label required"
                          >
                            {field.label}
                          </label>
                          <Field
                            name={`inventoryMetaData.${field.name}`}
                            as="select"
                            className="form-select"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Advanced Tab */}
                <div
                  className={`tab-pane ${activeTab === 'advanced' ? 'show active' : ''}`}
                >
                  <div className="row">
                    <div className="col-md-6">
                      {advancedStockFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className={`form-label ${field.optional ? '' : 'required'}`}
                          >
                            {field.label}
                          </label>
                          <Field
                            name={`inventoryMetaData.${field.name}`}
                            type="number"
                            min={field.min}
                            className="form-control"
                          />
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="col-md-6">
                      {otherFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className={`form-label ${field.optional ? '' : 'required'}`}
                          >
                            {field.label}
                          </label>
                          {field.type === 'textarea' ? (
                            <Field
                              name={`inventoryMetaData.${field.name}`}
                              as="textarea"
                              rows="3"
                              className="form-control"
                            />
                          ) : (
                            <Field
                              name={`inventoryMetaData.${field.name}`}
                              type={field.type || 'text'}
                              className="form-control"
                            />
                          )}
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Valuation Tab */}
                <div
                  className={`tab-pane ${activeTab === 'valuation' ? 'show active' : ''}`}
                >
                  <div className="row">
                    <div className="col-md-6">
                      {valuationFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label
                            htmlFor={`inventoryMetaData.${field.name}`}
                            className={`form-label ${field.optional ? '' : 'required'}`}
                          >
                            {field.label}
                          </label>
                          {field.type === 'select' ? (
                            <Field
                              name={`inventoryMetaData.${field.name}`}
                              as="select"
                              className="form-select"
                            >
                              {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Field>
                          ) : (
                            <Field
                              name={`inventoryMetaData.${field.name}`}
                              type="number"
                              min={field.min}
                              step={field.step || 1}
                              className="form-control"
                            />
                          )}
                          <ErrorMessage
                            name={`inventoryMetaData.${field.name}`}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="col-md-6">
                      <div className="alert alert-info">
                        <strong>
                          <i className="icofont-info-circle me-2"></i>Valuation
                          Info
                        </strong>
                        <p className="mb-0 mt-2 small">
                          Setting a unit cost allows the system to calculate
                          inventory value. The valuation method determines how
                          costs are calculated when stock is consumed.
                        </p>
                        <ul className="mb-0 mt-3 small">
                          <li>
                            <strong>FIFO</strong>: First items in are the first
                            ones sold
                          </li>
                          <li>
                            <strong>LIFO</strong>: Most recently received items
                            are sold first
                          </li>
                          <li>
                            <strong>WAC</strong>: Uses average cost across all
                            inventory
                          </li>
                          <li>
                            <strong>FEFO</strong>: Items expiring first are sold
                            first
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Overview */}
              <div className="alert alert-secondary mt-4">
                <strong>
                  <i className="icofont-check-circled me-2"></i>Status Overview:
                </strong>
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
                      <i className="icofont-warning me-1"></i>
                      Available quantity is below reorder threshold
                    </li>
                  )}
                  {values.inventoryMetaData?.inStock === false && (
                    <li className="text-danger">
                      <i className="icofont-close-circled me-1"></i>
                      Product is marked as out of stock
                    </li>
                  )}
                  {values.inventoryMetaData?.backOrderable === true && (
                    <li>
                      <i className="icofont-check me-1"></i>
                      Product can be back ordered
                    </li>
                  )}
                  {values.inventoryMetaData?.unitCost && (
                    <li>
                      <i className="icofont-money me-1"></i>
                      Estimated inventory value: $
                      {(
                        values.inventoryMetaData.quantity *
                        values.inventoryMetaData.unitCost
                      ).toFixed(2)}
                    </li>
                  )}
                </ul>
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
