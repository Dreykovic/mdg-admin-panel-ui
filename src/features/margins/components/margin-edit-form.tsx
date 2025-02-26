import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { MarginLevel } from '@/types/entity';
import { useMarginEdit } from '../hooks/use-margin-edit';

const MarginEditForm = ({
  show,
  handleClose,
  initialValues,
}: ModalProps & { initialValues: Partial<MarginLevel> }) => {
  const { validationSchema, handleSubmit } = useMarginEdit(handleClose);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Add Margin</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="mb-3">
                <label htmlFor="name" className="form-label required">
                  Margin Name
                </label>
                <Field name="name" type="text" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="margin" className="form-label required">
                  Margin Level
                </label>
                <Field name="margin" type="number" className="form-control" />
                <ErrorMessage
                  name="margin"
                  component="div"
                  className="text-danger"
                />
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button
                className="btn btn-secondary"
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
  );
};

export default MarginEditForm;
