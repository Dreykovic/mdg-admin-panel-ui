import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { AppDispatch } from '@/store';
import { ApiResponse } from '@/types/api';
import { UnitOfMeasure } from '@/types/entity';

import { useCreateUnitMutation } from '@/store/api-slice';
const initialValues: Partial<UnitOfMeasure> = {
  name: '',
  factor: 0,
  type: 'WEIGHT',
};

const UnitCreateForm = ({ show, handleClose }: ModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const validationsSchema = Yup.object({
    name: Yup.string()
      .required('Name is required.')
      .max(100, 'Name must be 100 characters or less.'),
    factor: Yup.number().required('Name is required.'),
    type: Yup.string(),
  });

  const [createUnit] = useCreateUnitMutation();

  const handleSubmit = async (
    values: Partial<UnitOfMeasure>,
    { setSubmitting }: FormikHelpers<Partial<UnitOfMeasure>>,
  ) => {
    try {
      if (values) {
        const data: Partial<UnitOfMeasure> = {
          name: values.name,
          factor: values.factor,
          type: values.type,
        };

        const response: ApiResponse<UnitOfMeasure> = await createUnit(
          data as UnitOfMeasure,
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
                <Modal.Title>{`Add Unit Of Mesure`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    {/* Margin Name */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label required">
                        Unit Name
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
                      <label htmlFor="factor" className="form-label required">
                        Factor To Standard
                      </label>
                      <Field
                        name="factor"
                        type="number"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="factor"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="type" className="form-label required">
                        Unit Type
                      </label>
                      <Field as="select" className="form-control" name="type">
                        <option value="">-- Sélect a type --</option>

                        <option value={'WEIGHT'}>Weight</option>
                        <option value={'VOLUME'}>Volume</option>
                        <option value={'OTHER'}>Other</option>
                      </Field>
                      <ErrorMessage
                        name="jobSuperiorId"
                        component="span"
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

export default UnitCreateForm;
