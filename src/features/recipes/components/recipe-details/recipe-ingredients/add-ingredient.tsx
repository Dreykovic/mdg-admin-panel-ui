import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useState } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { useCreateIngredientMutation } from '@/features/recipes/store/ingredient-api';
import UnitCreateForm from '@/features/units/components/unit-create-form';
import { AppDispatch } from '@/store';
import {
  useGetProductsListQuery,
  useGetUnitsListQuery,
} from '@/store/api-slice';
import { ApiResponse } from '@/types/api';
import { Ingredient } from '@/types/entity';

const IngredientCreateForm = ({
  show,
  handleClose,
  recipeId,
}: ModalProps & { recipeId: number }) => {
  const [showCreateUnitModal, setShowCreateUnitModal] = useState(false);

  const handleCreateUnitModalClose = () => setShowCreateUnitModal(false);
  const handleCreateUnitModalShow = () => setShowCreateUnitModal(true);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: Partial<Ingredient> = {
    quantity: 0, // Default value for quantity
    grindRequired: false, // Default value for grindRequired
    productId: '', // Default value for productId
    recipeId: recipeId, // Default value for recipeId
    unitOfMeasureId: undefined, // Default value for unitOfMeasureId
  };

  const validationsSchema = Yup.object({
    quantity: Yup.number()
      .required('Quantity is required')
      .min(0, 'Quantity must be at least 0')
      .typeError('Quantity must be a number'),

    grindRequired: Yup.boolean().required('Grind required is required'),

    productId: Yup.string().required('Product ID is required'),

    recipeId: Yup.number()
      .required('Recipe ID is required')
      .typeError('Recipe ID must be a number'),

    unitOfMeasureId: Yup.number()
      .required('Unit of Measure ID is required')
      .typeError('Unit of Measure ID must be a number'),
  });

  const [createIngredient] = useCreateIngredientMutation();

  const handleSubmit = async (
    values: Partial<Ingredient>,
    { setSubmitting }: FormikHelpers<Partial<Ingredient>>,
  ) => {
    try {
      if (values) {
        const data: Partial<Ingredient> = {
          ...values,
        };

        const response: ApiResponse<Ingredient> =
          await createIngredient(data).unwrap();

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
  // Récupération des categories
  const { data: uOMsResponse, isFetching: isUOMsFetching } =
    useGetUnitsListQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const uOMs = uOMsResponse?.content.uOMs;

  // Récupération des categories
  const { data: productsResponse, isFetching: isProductsFetching } =
    useGetProductsListQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const products = productsResponse?.content.products;
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
                <Modal.Title>{`Create Ingredient`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    <div className=" mb-3">
                      {/* Sélection de la direction */}

                      <label
                        htmlFor="productId"
                        className="form-label required"
                      >
                        Product
                      </label>

                      {isProductsFetching ? (
                        <div className="d-flex align-items-center">
                          <span
                            className="spinner-grow spinner-grow-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Fetching products...
                        </div>
                      ) : (
                        <>
                          <Field
                            as="select"
                            className="form-control"
                            name="productId"
                          >
                            <option value="">-- Select a product --</option>
                            {products?.map((option) => (
                              <option key={option.id} value={option.id}>
                                {`${option.name}`}
                              </option>
                            ))}
                          </Field>
                        </>
                      )}

                      <ErrorMessage
                        name="productId"
                        component="span"
                        className="text-danger"
                      />
                    </div>
                    <div className="row">
                      {/* Ingredient Name */}
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="quantity"
                          className="form-label required"
                        >
                          Ingredient Quantity
                        </label>
                        <Field
                          name="quantity"
                          type="number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="quantity"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        {/* Sélection de la direction */}

                        <label
                          htmlFor="unitOfMeasureId"
                          className="form-label required"
                        >
                          Unit Of Measure
                        </label>
                        <div className="d-flex w-sm-100 g-3">
                          {isUOMsFetching ? (
                            <div className="d-flex align-items-center">
                              <span
                                className="spinner-grow spinner-grow-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Fetching units...
                            </div>
                          ) : (
                            <>
                              <Field
                                as="select"
                                className="form-control"
                                name="unitOfMeasureId"
                              >
                                <option value="">-- Select an unit --</option>
                                {uOMs?.map((option) => (
                                  <option key={option.id} value={option.id}>
                                    {`${option.name}`}
                                  </option>
                                ))}
                              </Field>
                            </>
                          )}
                          <span
                            role="button"
                            className="btn btn-light"
                            onClick={handleCreateUnitModalShow}
                          >
                            <i className="icofont-plus  fs-4"></i>
                          </span>
                        </div>
                        <ErrorMessage
                          name="unitOfMeasureId"
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
      <UnitCreateForm
        show={showCreateUnitModal}
        handleClose={handleCreateUnitModalClose}
      />
    </>
  );
};

export default IngredientCreateForm;
