import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { AppDispatch } from '@/store';
import { useEditSupplierMutation } from '@/store/api/supplier';
import { ApiResponse } from '@/types/api';
import { Supplier } from '@/types/entity';

const SupplierEditForm = ({
  show,
  handleClose,
  initialValues,
}: ModalProps & { initialValues: Partial<Supplier> }) => {
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
    postalCode: Yup.string()
      .required('Postal code is required.')
      .matches(
        /^[0-9]{5}(-[0-9]{4})?$/,
        'Postal code must be a valid format (e.g., 12345 or 12345-6789).',
      ),
  });

  const [editSupplier] = useEditSupplierMutation();

  const handleSubmit = async (
    values: Partial<Supplier>,
    { setSubmitting }: FormikHelpers<Partial<Supplier>>,
  ) => {
    try {
      if (values) {
        const data: Partial<Supplier> = {
          id: values.id,
          name: values.name,
          address1: values.address1,
          address2: values.address2,
          state: values.state,
          city: values.city,
          country: values.country,
          postalCode: values.postalCode,
        };

        const response: ApiResponse<Supplier> = await editSupplier(
          data as Supplier,
        ).unwrap();

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
                      <label htmlFor="name" className="form-label">
                        Supplier Name
                      </label>
                      <Field name="name" type="text" className="form-control" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* Address Line 1 */}
                    <div className="mb-3">
                      <label htmlFor="address1" className="form-label">
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

                    {/* City */}
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <Field name="city" type="text" className="form-control" />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-danger"
                      />
                    </div>

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

                    {/* Country */}
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">
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

                    {/* Postal Code */}
                    <div className="mb-3">
                      <label htmlFor="postalCode" className="form-label">
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

export default SupplierEditForm;
