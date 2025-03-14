import { Field, ErrorMessage } from 'formik';

import { formatCurrency } from '@/utils/format';

import { CreateInventoryPayload } from '../../types';
const CostTab = ({ values }: { values: CreateInventoryPayload }) => {
  // Définition des champs par catégorie

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

  return (
    <>
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
                {field.required && <span className="text-danger">*</span>}
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
              <small className="text-muted d-block mt-1">{field.hint}</small>
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
              <h5 className="mb-3 text-primary">Valuation Preview</h5>
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
                Enter unit cost and quantity to see valuation preview
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div className="alert alert-info">
            <strong>
              <i className="icofont-info-circle me-2"></i>Valuation Info
            </strong>
            <p className="mb-0 mt-2 small">
              Setting a unit cost allows the system to calculate inventory
              value. The valuation method determines how costs are calculated
              when stock is consumed.
            </p>
            <ul className="mb-0 mt-3 small">
              <li>
                <strong>FIFO</strong>: First items in are the first ones sold
              </li>
              <li>
                <strong>LIFO</strong>: Most recently received items are sold
                first
              </li>
              <li>
                <strong>WAC</strong>: Uses average cost across all inventory
              </li>
              <li>
                <strong>FEFO</strong>: Items expiring first are sold first
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CostTab;
