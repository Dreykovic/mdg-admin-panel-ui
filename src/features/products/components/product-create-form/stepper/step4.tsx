import { ErrorMessage, Field } from 'formik';

const Step4 = () => {
  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="quantity" className="form-label required">
            Initial Quantity (In Gram)
          </label>

          <Field
            name="quantity"
            type="number"
            className="form-control"
            placeholder="Initial Quantity"
          />
          <ErrorMessage
            name="quantity"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="minimumStockLevel" className="form-label required">
            Minimum Stock Level (Default To 1000 Grams)
          </label>
          <Field
            name="minimumStockLevel"
            type="number"
            className="form-control"
            placeholder="Minimum Stock Level"
          />
          <ErrorMessage
            name="minimumStockLevel"
            component="span"
            className="text-danger"
          />
        </div>
      </div>

      <div className="form-check form-switch mb-3">
        <Field
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="isActive"
          name="isActive"
        />
        <label className="form-check-label" htmlFor="isActive">
          In Stock{' '}
        </label>
        <ErrorMessage
          name="isActive"
          component="span"
          className="text-danger"
        />
      </div>
      <div className="form-check form-switch mb-3">
        <Field
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="isPublic"
          name="isPublic"
        />
        <label className="form-check-label" htmlFor="isPublic">
          Visible On Site
        </label>
        <ErrorMessage
          name="isPublic"
          component="span"
          className="text-danger"
        />
      </div>
    </>
  );
};

export default Step4;
