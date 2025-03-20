import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { AppDispatch } from '@/store';
import { useEditStepMutation } from '@/services/step';
import { ApiResponse } from '@/types/api';
import { Step } from '@/types/entity';

const StepEditForm = ({
  show,
  handleClose,
  initialValues,
}: ModalProps & { initialValues: Partial<Step> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const validationsSchema = Yup.object({
    id: Yup.number()
      .required('Step id is required')
      .integer('Step number must be an integer')
      .positive('Step number must be a positive number'),
    stepNumber: Yup.number()
      .required('Step number is required')
      .integer('Step number must be an integer')
      .positive('Step number must be a positive number'),

    description: Yup.string()
      .optional()
      .max(500, 'Description must be at most 500 characters long'),

    duration: Yup.number()
      .required('Duration is required')
      .positive('Duration must be a positive number')
      .integer('Duration must be an integer'),

    recipeId: Yup.number()
      .required('Recipe ID is required')
      .positive('Recipe ID must be a positive number')
      .integer('Recipe ID must be an integer'),
  });

  const [editStep] = useEditStepMutation();

  const handleSubmit = async (
    values: Partial<Step>,
    { setSubmitting }: FormikHelpers<Partial<Step>>,
  ) => {
    try {
      if (values) {
        const data: Partial<Step> = {
          id: values.id as number,
          stepNumber: values.stepNumber as number,
          duration: values.duration as number,
          description: values.description,
          recipeId: values.recipeId as number,
        };

        const response: ApiResponse<Step> = await editStep(
          data as Step,
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
                <Modal.Title>{`Create Step`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    {/* Step Details */}
                    <h5 className="mb-4">Step Details</h5>
                    <div className="row">
                      {/* Step Name */}
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="stepNumber"
                          className="form-label required"
                        >
                          Step Number
                        </label>
                        <Field
                          name="stepNumber"
                          type="number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="stepNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="duration"
                          className="form-label required"
                        >
                          Step Duration (minute)
                        </label>
                        <Field
                          name="duration"
                          type="number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="duration"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <Field
                        name="description"
                        as="textarea"
                        rows="3"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="description"
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

export default StepEditForm;
