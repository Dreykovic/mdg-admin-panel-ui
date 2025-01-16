import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/loading-button';
import { AppDispatch } from '@/store';
import { ApiResponse } from '@/types/api';
import { Origin } from '@/types/entity';

import { useCreateOriginMutation } from '../store/api';
const initialValues: Partial<Origin> = { country: '' };

const OriginCreateForm = ({ show, handleClose }: ModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const validationsSchema = Yup.object({
    country: Yup.string().required('The origin country is required'),
    // image: Yup.string().required('Le nom est obligatoire'),
  });

  const [createOrigin] = useCreateOriginMutation();

  const handleSubmit = async (
    values: Partial<Origin>,
    { setSubmitting }: FormikHelpers<Partial<Origin>>,
  ) => {
    try {
      if (values) {
        const data: Partial<Origin> = {
          country: values.country,
        };

        const response: ApiResponse<Origin> = await createOrigin(data).unwrap();

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
                <Modal.Title>{`Create Origin`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label required">
                        Origin Country
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

export default OriginCreateForm;
