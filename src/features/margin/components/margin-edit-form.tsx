import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/loading-button';
import { AppDispatch } from '@/store';
import { ApiResponse } from '@/types/api';
import { useEditMarginMutation } from '../store/api';
import { MarginLevel } from '@/types/entity';

const MarginEditForm = ({
  show,
  handleClose,
  initialValues,
}: ModalProps & { initialValues: Partial<MarginLevel> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const validationsSchema = Yup.object({
    name: Yup.string()
      .required('Name is required.')
      .max(100, 'Name must be 100 characters or less.'),
    margin: Yup.number().required('Name is required.'),
  });

  const [editMargin] = useEditMarginMutation();

  const handleSubmit = async (
    values: Partial<MarginLevel>,
    { setSubmitting }: FormikHelpers<Partial<MarginLevel>>,
  ) => {
    try {
      if (values) {
        const data: Partial<MarginLevel> = {
          id: values.id,
          name: values.name,
          margin: values.margin,
        };

        const response: ApiResponse<MarginLevel> = await editMargin(
          data as MarginLevel,
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
                <Modal.Title>{`Add Margin`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    {/* Margin Name */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Margin Name
                      </label>
                      <Field name="name" type="text" className="form-control" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* MArgin Level */}
                    <div className="mb-3">
                      <label htmlFor="margin" className="form-label">
                        MArgin Level
                      </label>
                      <Field
                        name="margin"
                        type="number"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="margin"
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

export default MarginEditForm;
