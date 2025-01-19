import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { AppDispatch } from '@/store';
import { ApiResponse } from '@/types/api';
import { VolumeConversion } from '@/types/entity';
import { useCreateProductConversionSettingMutation } from '@/store/api-slice';

const ProductSettingCreateForm = ({
  show,
  handleClose,
  productId,
}: ModalProps & { productId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: Partial<VolumeConversion> = {
    m1: undefined,
    m2: undefined,
    m3: undefined,

    productId: productId,
  };

  const validationsSchema = Yup.object({
    m1: Yup.number()
      .required('Measure 1 is required.')
      .integer('Measure 1 must be a whole number.')
      .positive('Measure 1 must be greater than 0.'),
    m2: Yup.number()
      .required('Measure 2 is required.')
      .integer('Measure 2 must be a whole number.')
      .positive('Measure 2 must be greater than 0.'),
    m3: Yup.number()
      .required('Measure 3 is required.')
      .integer('Measure 3 must be a whole number.')
      .positive('Measure 3 must be greater than 0.'),

    productId: Yup.string().required('Product is required.'),
  });

  const [createProductConversionSetting] =
    useCreateProductConversionSettingMutation();

  const handleSubmit = async (
    values: Partial<VolumeConversion>,
    { setSubmitting }: FormikHelpers<Partial<VolumeConversion>>,
  ) => {
    try {
      if (values) {
        const data: Partial<VolumeConversion> = {
          ...values,
        };

        const response: ApiResponse<VolumeConversion> =
          await createProductConversionSetting(data).unwrap();

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
                <Modal.Title>{`Set Product Conversion Data`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    <h5 className="mb-4">Measures Details</h5>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="m1" className="form-label required">
                          M1
                        </label>
                        <Field
                          name="m1"
                          type="number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="m1"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="m2" className="form-label required">
                          M2
                        </label>
                        <Field
                          name="m2"
                          type="number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="m2"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="m3" className="form-label required">
                          M3
                        </label>
                        <Field
                          name="m3"
                          type="number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="m3"
                          component="div"
                          className="text-danger"
                        />
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

export default ProductSettingCreateForm;
