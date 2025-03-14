import { ErrorMessage, Field } from 'formik';

const LocationTab = () => {
  // Définition des champs par catégorie

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
    <>
      <div className="row mt-3">
        <div className="col-md-6">
          <h5 className="mb-3 text-primary border-bottom pb-2">
            Storage Location
          </h5>

          {locationFields.map((field) => (
            <div className="mb-3" key={field.name}>
              <label
                htmlFor={`inventoryMetaData.${field.name}`}
                className="form-label fw-semibold"
              >
                {field.label}{' '}
                {field.required && <span className="text-danger">*</span>}
              </label>
              <Field
                name={`inventoryMetaData.${field.name}`}
                type="text"
                className={`form-control`}
              />
              <small className="text-muted d-block mt-1">{field.hint}</small>
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
                {field.required && <span className="text-danger">*</span>}
              </label>
              <Field
                name={`inventoryMetaData.${field.name}`}
                as="textarea"
                rows="3"
                className={`form-control`}
              />
              <small className="text-muted d-block mt-1">{field.hint}</small>
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
                {field.required && <span className="text-danger">*</span>}
              </label>
              <Field
                name={`inventoryMetaData.${field.name}`}
                as="select"
                className={`form-select`}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Field>
              <small className="text-muted d-block mt-1">{field.hint}</small>
              <ErrorMessage
                name={`inventoryMetaData.${field.name}`}
                component="div"
                className="invalid-feedback"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LocationTab;
