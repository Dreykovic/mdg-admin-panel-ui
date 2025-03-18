import { Field, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { setPageName } from '@/store/slice/page-slice';

const QuantitiesTab = () => {
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
      required: true,
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
      hint: 'Buffer stock to prevent stock outs',
      required: true,
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

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-6">
          <h5 className="mb-3 text-primary border-bottom pb-2">
            Current Stock
          </h5>
          {quantityFields.map((field) => (
            <div className="mb-3" key={field.name}>
              <label
                htmlFor={`${field.name}`}
                className="form-label fw-semibold"
              >
                {field.label}{' '}
                {field.required && <span className="text-danger">*</span>}
              </label>
              <Field
                name={`${field.name}`}
                type="number"
                min="0"
                step="0.01"
                className={`form-control`}
              />
              <small className="text-muted d-block mt-1">{field.hint}</small>
              <ErrorMessage
                name={`${field.name}`}
                component="div"
                className="text-danger"
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
                htmlFor={`${field.name}`}
                className="form-label fw-semibold"
              >
                {field.label}{' '}
                {field.required && <span className="text-danger">*</span>}
              </label>
              <Field
                name={`${field.name}`}
                type="number"
                min="0"
                step={field.name === 'leadTimeInDays' ? '1' : '0.01'}
                className={`form-control`}
              />
              <small className="text-muted d-block mt-1">{field.hint}</small>
              <ErrorMessage
                name={`${field.name}`}
                component="div"
                className="text-danger"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuantitiesTab;
