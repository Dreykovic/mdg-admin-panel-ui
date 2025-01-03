import { ErrorMessage, Field } from 'formik';

const Step1 = () => {
  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="lastName" className="form-label required">
            Last Name
          </label>
          <Field
            name="lastName"
            type="text"
            className="form-control"
            placeholder="Enter Last Name"
          />
          <ErrorMessage
            name="lastName"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label required">
            First Name
          </label>
          <Field
            name="firstName"
            type="text"
            className="form-control"
            placeholder="Enter First Name"
          />
          <ErrorMessage
            name="firstName"
            component="span"
            className="text-danger"
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label required">
          Email Address
        </label>
        <Field
          name="email"
          type="email"
          className="form-control"
          placeholder="Enter Email Address"
        />
        <ErrorMessage name="email" component="span" className="text-danger" />
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label required">
          Phone Number
        </label>
        <Field
          name="phoneNumber"
          type="tel"
          className="form-control"
          placeholder="+123 4567890"
        />
        <ErrorMessage
          name="phoneNumber"
          component="span"
          className="text-danger"
        />
      </div>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="address1" className="form-label required">
            Primary Address
          </label>
          <Field
            name="address1"
            type="text"
            className="form-control"
            placeholder="(Street, Neighborhood, House)"
          />
          <ErrorMessage
            name="address1"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="country" className="form-label required">
            Country
          </label>
          <Field
            name="country"
            type="text"
            className="form-control"
            placeholder="e.g., USA"
            readOnly
          />
          <ErrorMessage
            name="country"
            component="span"
            className="text-danger"
          />
        </div>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <Field
            name="city"
            type="text"
            className="form-control"
            placeholder="City of Residence"
          />
          <ErrorMessage name="city" component="span" className="text-danger" />
        </div>
        <div className="col-sm-6">
          <label htmlFor="address2" className="form-label">
            Secondary Address
          </label>
          <Field
            name="address2"
            type="text"
            className="form-control"
            placeholder="Apartment, Suite, etc."
          />
          <ErrorMessage
            name="address2"
            component="span"
            className="text-danger"
          />
        </div>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="zipCode" className="form-label required">
            Zip Code
          </label>
          <Field
            name="zipCode"
            type="text"
            className="form-control"
            placeholder="e.g., 12345"
          />
          <ErrorMessage
            name="zipCode"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="state" className="form-label required">
            State/Province
          </label>
          <Field
            name="state"
            type="text"
            className="form-control"
            placeholder="State or Province"
          />
          <ErrorMessage name="state" component="span" className="text-danger" />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="notes" className="form-label">
          Additional Notes
        </label>
        <Field
          name="notes"
          as="textarea"
          className="form-control"
          placeholder="Enter any additional information here"
        />
        <ErrorMessage name="notes" component="span" className="text-danger" />
      </div>
    </>
  );
};

export default Step1;
