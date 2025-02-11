import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { AppDispatch } from '@/store';
import { ApiResponse } from '@/types/api';
import { Product } from '@/types/entity';

import { useEditProductMutation } from '../../../store/api';
import { useState } from 'react';

import { useGetSuppliersListQuery } from '@/store/api-slice';

import DynamicAddBtn from '@/components/ui/buttons/dynamic-add-button';
import SupplierCreateForm from '@/features/suppliers/components/supplier-create-form';
const ProductSupplierEditForm = ({
  show,
  handleClose,
  product,
}: ModalProps & { product: Product }) => {
  const [showCreateSupplierModal, setShowCreateSupplierModal] = useState(false);

  const handleCreateSupplierModalClose = () =>
    setShowCreateSupplierModal(false);
  const handleCreateSupplierModalShow = () => setShowCreateSupplierModal(true);
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: Partial<Product> = {
    supplierId: product.supplierId,
    id: product.id as string,
  };

  const validationsSchema = Yup.object({
    supplierId: Yup.number()
      .integer()
      .positive()
      .required('Supplier ID is required')
      .typeError('Supplier ID must be a positive integer'),

    id: Yup.string().required('product Id is required.'),
  });

  const [updateProductMetadata] = useEditProductMutation();
  // Récupération des suppliers
  const { data: suppliersResponse, isFetching: isSuppliersFetching } =
    useGetSuppliersListQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });
  const suppliers = suppliersResponse?.content.suppliers;

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
                <Modal.Title>{`Update Product Supplier`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="mb-3">
                      {/* Sélection de la direction */}

                      <label
                        htmlFor="supplierId"
                        className="form-label required"
                      >
                        Supplier
                      </label>
                      <div className="d-flex w-sm-100 g-3">
                        {isSuppliersFetching ? (
                          <div className="d-flex align-items-center">
                            <span
                              className="spinner-grow spinner-grow-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Fetching suppliers...
                          </div>
                        ) : (
                          <>
                            <Field
                              as="select"
                              className="form-control"
                              name="supplierId"
                            >
                              <option value="">-- Select a supplier --</option>
                              {suppliers?.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                            </Field>
                          </>
                        )}

                        <DynamicAddBtn
                          handleClick={handleCreateSupplierModalShow}
                        />
                      </div>
                      <ErrorMessage
                        name="supplierId"
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
      <SupplierCreateForm
        show={showCreateSupplierModal}
        handleClose={handleCreateSupplierModalClose}
      />
    </>
  );
};

export default ProductSupplierEditForm;
