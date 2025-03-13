import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useState } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import DynamicAddBtn from '@/components/ui/buttons/dynamic-add-button';
import LoadingButton from '@/components/ui/buttons/loading-button';
import MarginCreateForm from '@/features/margins/components/margin-create-form';
import { AppDispatch } from '@/store';
import { useGetMarginsListQuery } from '@/store/api/margin-level';
import { useEditProductMutation } from '@/store/api/product';
import { ApiResponse } from '@/types/api';
import { Product } from '@/types/entity';

const ProductMarginEditForm = ({
  show,
  handleClose,
  product,
}: ModalProps & { product: Product }) => {
  const [showCreateMarginModal, setShowCreateMarginModal] = useState(false);

  const handleCreateMarginModalClose = () => setShowCreateMarginModal(false);
  const handleCreateMarginModalShow = () => setShowCreateMarginModal(true);

  const dispatch = useDispatch<AppDispatch>();
  const initialValues: Partial<Product> = {
    marginLevelId: product.marginLevelId,
    id: product.id as string,
  };

  const validationsSchema = Yup.object({
    marginLevelId: Yup.number()
      .integer()
      .positive()
      .required('Margin ID is required')
      .typeError('Margin ID must be a positive integer'),

    id: Yup.string().required('product Id is required.'),
  });

  const [updateProductMetadata] = useEditProductMutation();
  // Récupération des categories
  const { data: marginsResponse, isFetching: isMarginsFetching } =
    useGetMarginsListQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });
  const margins = marginsResponse?.content.margins;
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
                      <div className="mb-3">
                        <label
                          htmlFor="marginLevelId"
                          className="form-label required"
                        >
                          Margin Level
                        </label>
                        <div className="d-flex w-sm-100 g-3">
                          {isMarginsFetching ? (
                            <div className="d-flex align-items-center">
                              <span
                                className="spinner-grow spinner-grow-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Fetching Margins...
                            </div>
                          ) : (
                            <>
                              <Field
                                as="select"
                                className="form-control"
                                name="marginLevelId"
                              >
                                <option value="">
                                  -- Select a margin level --
                                </option>
                                {margins?.map((option) => (
                                  <option key={option.id} value={option.id}>
                                    {`${option.name} (${option.margin}%)`}
                                  </option>
                                ))}
                              </Field>
                            </>
                          )}

                          <DynamicAddBtn
                            handleClick={handleCreateMarginModalShow}
                          />
                        </div>
                        <ErrorMessage
                          name="marginLevelId"
                          component="span"
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

      <MarginCreateForm
        show={showCreateMarginModal}
        handleClose={handleCreateMarginModalClose}
      />
    </>
  );
};

export default ProductMarginEditForm;
