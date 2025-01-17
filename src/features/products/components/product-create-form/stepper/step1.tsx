import { ErrorMessage, Field } from 'formik';

const Step1 = () => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="name" className="form-label required">
          Product Name
        </label>
        <Field
          name="name"
          type="text"
          className="form-control"
          placeholder="Product Name"
        />
        <ErrorMessage name="name" component="span" className="text-danger" />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label ">
          Description
        </label>
        <Field
          as="textarea"
          className="form-control"
          name="description"
          placeholder="Description (optional)"
        ></Field>
        <ErrorMessage
          name="description"
          component="span"
          className="text-danger"
        />
      </div>

      <div className="form-check form-switch mb-3">
        <Field
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="isGlutenFree"
          name="isGlutenFree"
        />
        <label className="form-check-label mx-2" htmlFor="isGlutenFree">
          Gluten Free
        </label>
        <ErrorMessage
          name="isGlutenFree"
          component="span"
          className="text-danger mx-2"
        />
      </div>
      <div className="form-check form-switch mb-3">
        <Field
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="isGMOFree"
          name="isGMOFree"
        />
        <label className="form-check-label mx-2" htmlFor="isGMOFree">
          GMO Free
        </label>
        <ErrorMessage
          name="isGMOFree"
          component="span"
          className="text-danger mx-2"
        />
      </div>
    </>
  );
};

export default Step1;
