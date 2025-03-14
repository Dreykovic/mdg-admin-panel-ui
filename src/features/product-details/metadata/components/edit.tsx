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

const ProductMetadataEditForm = ({
  show,
  handleClose,
  product,
}: ModalProps & { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: Partial<Product> = {
    name: product.name,
    description: product.description,

    id: product.id as string,
  };

  const validationsSchema = Yup.object({
    name: Yup.string()
      .required('Name is required.')
      .min(3, 'Name must be at least 3 characters long.')
      .max(100, 'Name must not exceed 100 characters.'),
    description: Yup.string()
      .max(500, 'Description must not exceed 500 characters.')
      .nullable(),

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
                    {/* Step Details */}
                    <h5 className="mb-4">Product Metadata</h5>

                    {/* Step Name */}
                    <div className=" mb-3">
                      <label htmlFor="name" className="form-label required">
                        Product Name
                      </label>
                      <Field name="name" type="text" className="form-control" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
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

export default ProductMetadataEditForm;
