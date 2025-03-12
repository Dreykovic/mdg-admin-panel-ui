import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { AppDispatch } from '@/store';
import { useEditProductMutation } from '@/store/api/product';
import { ApiResponse } from '@/types/api';
import { Product } from '@/types/entity';

const ProductPriceSettingsEditForm = ({
  show,
  handleClose,
  product,
}: ModalProps & { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: Partial<Product> = {
    additionalCost: product.additionalCost,
    costPerGramWhole: product.costPerGramWhole,
    costPerGramGround: product.costPerGramGround,
    id: product.id,
  };
  const validationsSchema = Yup.object({
    additionalCost: Yup.number()
      .nullable()
      .typeError('Additional cost must be a positive number'),
    costPerGramWhole: Yup.number()
      .positive()
      .required('Cost per gram (whole) is required')
      .typeError('Cost per gram (whole) must be a positive number'),
    costPerGramGround: Yup.number()
      .positive()
      .required('Cost per gram (ground) is required')
      .typeError('Cost per gram (ground) must be a positive number'),

    id: Yup.string().required('product Id is required.'),
  });

  const [updateProductMetadata] = useEditProductMutation();

  const handleSubmit = async (
    values: Partial<Product>,
    { setSubmitting }: FormikHelpers<Partial<Product>>,
  ) => {
    try {
      if (values) {
        const data: Partial<Product> = {
          ...values,
        };

        const response: ApiResponse<Product> =
          await updateProductMetadata(data).unwrap();

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
                <Modal.Title>{`Update Product Metadata`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="mb-3">
                      <label
                        htmlFor="costPerGramWhole"
                        className="form-label required"
                      >
                        Whole
                      </label>

                      <Field
                        name="costPerGramWhole"
                        type="number"
                        className="form-control"
                        placeholder="Cost per gram (whole)"
                      />
                      <ErrorMessage
                        name="costPerGramWhole"
                        component="span"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="costPerGramGround"
                        className="form-label required"
                      >
                        Ground
                      </label>
                      <Field
                        name="costPerGramGround"
                        type="number"
                        className="form-control"
                        placeholder="Cost per gram (ground)"
                      />
                      <ErrorMessage
                        name="costPerGramGround"
                        component="span"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="additionalCost" className="form-label">
                        Additional cost
                      </label>

                      <Field
                        name="additionalCost"
                        type="number"
                        className="form-control"
                        placeholder="Additional cost"
                      />
                      <ErrorMessage
                        name="additionalCost"
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

export default ProductPriceSettingsEditForm;
