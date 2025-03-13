import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useState } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import DynamicAddBtn from '@/components/ui/buttons/dynamic-add-button';
import LoadingButton from '@/components/ui/buttons/loading-button';
import CategoryCreateForm from '@/features/categories/components/category-create-form';
import { AppDispatch } from '@/store';
import { useGetCategoriesListQuery } from '@/store/api/category';
import { useEditProductMutation } from '@/store/api/product';
import { ApiResponse } from '@/types/api';
import { Product } from '@/types/entity';

const ProductCategoryEditForm = ({
  show,
  handleClose,
  product,
}: ModalProps & { product: Product }) => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const handleCreateCategoryModalClose = () =>
    setShowCreateCategoryModal(false);
  const handleCreateCategoryModalShow = () => setShowCreateCategoryModal(true);
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: Partial<Product> = {
    categoryId: product.categoryId,
    id: product.id as string,
  };

  const validationsSchema = Yup.object({
    categoryId: Yup.number()
      .integer()
      .positive()
      .required('Category ID is required')
      .typeError('Category ID must be a positive integer'),

    id: Yup.string().required('product Id is required.'),
  });

  const [updateProductMetadata] = useEditProductMutation();
  // Récupération des categories
  const { data: categoriesResponse, isFetching: isCategoriesFetching } =
    useGetCategoriesListQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });
  const categories = categoriesResponse?.content.categories;
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
                <Modal.Title>{`Update Product Category`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="">
                      {/* Sélection de la direction */}

                      <label
                        htmlFor="categoryId"
                        className="form-label required"
                      >
                        Categories
                      </label>
                      <div className="d-flex w-sm-100 g-3">
                        {isCategoriesFetching ? (
                          <div className="d-flex align-items-center">
                            <span
                              className="spinner-grow spinner-grow-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Fetching categories...
                          </div>
                        ) : (
                          <>
                            <Field
                              as="select"
                              className="form-control"
                              name="categoryId"
                            >
                              <option value="">-- Select a category --</option>
                              {categories?.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                            </Field>
                          </>
                        )}

                        <DynamicAddBtn
                          handleClick={handleCreateCategoryModalShow}
                        />
                      </div>
                      <ErrorMessage
                        name="categoryId"
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
      <CategoryCreateForm
        show={showCreateCategoryModal}
        handleClose={handleCreateCategoryModalClose}
      />
    </>
  );
};

export default ProductCategoryEditForm;
