import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { AppDispatch } from '@/store';
import { useCreateSupplierMutation } from '@/store/api/supplier';
import { ApiResponse } from '@/types/api';
import { Supplier } from '@/types/entity';

const initialValues: Partial<Supplier> = {
  name: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
};

const SupplierCreateForm = ({ show, handleClose }: ModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const validationsSchema = Yup.object({
    name: Yup.string()
      .required('Name is required.')
      .max(100, 'Name must be 100 characters or less.'),
    address1: Yup.string()
      .required('Address line 1 is required.')
      .max(255, 'Address line 1 must be 255 characters or less.'),
    address2: Yup.string().max(
      255,
      'Address line 2 must be 255 characters or less.',
    ),
    city: Yup.string()
      .required('City is required.')
      .max(100, 'City must be 100 characters or less.'),
    state: Yup.string().max(100, 'State must be 100 characters or less.'),
    country: Yup.string()
      .required('Country is required.')
      .max(100, 'Country must be 100 characters or less.'),
    postalCode: Yup.string().required('Postal code is required.'),
    // .matches(
    //   /^[0-9]{5}(-[0-9]{4})?$/,
    //   'Postal code must be a valid format (e.g., 12345 or 12345-6789).',
    // ),
  });

  const [createSupplier] = useCreateSupplierMutation();

  const handleSubmit = async (
    values: Partial<Supplier>,
    { setSubmitting }: FormikHelpers<Partial<Supplier>>,
  ) => {
    try {
      if (values) {
        const data: Partial<Supplier> = {
          ...values,
        };

        const response: ApiResponse<Supplier> =
          await createSupplier(data).unwrap();

        if (response.success) {
          dispatch(
            showAlert({
              title: 'Succuss !',
              message: `${response.message}`,
            }),
          );
        }

        handleClose();
      } else {
        throw new Error('No Data Provided');
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          title: 'Error !',
          message:
            'An error occurred during the submission ' +
            (error as any).data.error.message,
          success: false,
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationsSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>{`Add Supplier`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    {/* Supplier Name */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label required">
                        Supplier Name
                      </label>
                      <Field name="name" type="text" className="form-control" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        {/* Address Line 1 */}
                        <div className="mb-3">
                          <label
                            htmlFor="address1"
                            className="form-label required"
                          >
                            Address Line 1
                          </label>
                          <Field
                            name="address1"
                            type="text"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="address1"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col">
                        {/* Address Line 2 */}
                        <div className="mb-3">
                          <label htmlFor="address2" className="form-label">
                            Address Line 2 (optional)
                          </label>
                          <Field
                            name="address2"
                            type="text"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="address2"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        {/* City */}
                        <div className="mb-3">
                          <label htmlFor="city" className="form-label required">
                            City
                          </label>
                          <Field
                            name="city"
                            type="text"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="city"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col">
                        {/* State */}
                        <div className="mb-3">
                          <label htmlFor="state" className="form-label">
                            State (optional)
                          </label>
                          <Field
                            name="state"
                            type="text"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="state"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        {/* Country */}
                        <div className="mb-3">
                          <label
                            htmlFor="country"
                            className="form-label required"
                          >
                            Country
                          </label>
                          <Field
                            name="country"
                            type="text"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="country"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col">
                        {/* Postal Code */}
                        <div className="mb-3">
                          <label
                            htmlFor="postalCode"
                            className="form-label required"
                          >
                            Postal Code
                          </label>
                          <Field
                            name="postalCode"
                            type="text"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="postalCode"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <button
                  className="btn btn-secondary"
                  role="button"
                  type="reset"
                  onClick={handleClose}
                >
                  Close
                </button>

                <LoadingButton isLoading={isSubmitting} />
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default SupplierCreateForm;
