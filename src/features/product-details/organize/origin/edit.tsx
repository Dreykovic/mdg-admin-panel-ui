import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useState } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import DynamicAddBtn from '@/components/ui/buttons/dynamic-add-button';
import LoadingButton from '@/components/ui/buttons/loading-button';
import OriginCreateForm from '@/features/origins/components/origin-create-form';
import { AppDispatch } from '@/store';
import { useGetOriginsListQuery } from '@/services/origin';
import { useEditProductMutation } from '@/services/product';
import { ApiResponse } from '@/types/api';
import { Product } from '@/types/entity';

const ProductOriginEditForm = ({
  show,
  handleClose,
  product,
}: ModalProps & { product: Product }) => {
  const [showCreateOriginModal, setShowCreateOriginModal] = useState(false);

  const handleCreateOriginModalClose = () => setShowCreateOriginModal(false);
  const handleCreateOriginModalShow = () => setShowCreateOriginModal(true);
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: Partial<Product> = {
    originId: product.originId,
    id: product.id as string,
  };

  const validationsSchema = Yup.object({
    originId: Yup.number()
      .integer()
      .positive()
      .required('Origin ID is required')
      .typeError('Origin ID must be a positive integer'),

    id: Yup.string().required('product Id is required.'),
  });

  const [updateProductMetadata] = useEditProductMutation();
  // Récupération des origins
  const { data: originsResponse, isFetching: isOriginsFetching } =
    useGetOriginsListQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });
  const origins = originsResponse?.content.origins;

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
                <Modal.Title>{`Update Product Origin`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="">
                      {/* Sélection de la direction */}

                      <label htmlFor="originId" className="form-label required">
                        Origin
                      </label>
                      <div className="d-flex w-sm-100 g-3">
                        {isOriginsFetching ? (
                          <div className="d-flex align-items-center">
                            <span
                              className="spinner-grow spinner-grow-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Fetching Origins...
                          </div>
                        ) : (
                          <>
                            <Field
                              as="select"
                              className="form-control"
                              name="originId"
                            >
                              <option value="">-- Select an origin --</option>
                              {origins?.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.country}
                                </option>
                              ))}
                            </Field>
                          </>
                        )}

                        <DynamicAddBtn
                          handleClick={handleCreateOriginModalShow}
                        />
                      </div>
                      <ErrorMessage
                        name="originId"
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

      <OriginCreateForm
        show={showCreateOriginModal}
        handleClose={handleCreateOriginModalClose}
      />
    </>
  );
};

export default ProductOriginEditForm;
