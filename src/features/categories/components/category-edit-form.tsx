import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { AppDispatch } from '@/store';
import { useEditCategoryMutation } from '@/store/api/category';
import { ApiResponse } from '@/types/api';
import { ProductCategory } from '@/types/entity';

const CategoryEditForm = ({
  show,
  handleClose,
  initialValues,
}: ModalProps & { initialValues: Partial<ProductCategory> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const validationsSchema = Yup.object({
    name: Yup.string().required('The category name is required'),
    id: Yup.string().required('Category id is required'),
  });

  const [editCategory] = useEditCategoryMutation();

  const handleSubmit = async (
    values: Partial<ProductCategory>,
    { setSubmitting }: FormikHelpers<Partial<ProductCategory>>,
  ) => {
    try {
      if (values) {
        const data: Partial<ProductCategory> = {
          id: values.id,
          name: values.name,
        };

        const response: ApiResponse<ProductCategory> = await editCategory(
          data as ProductCategory,
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
                <Modal.Title>{`Edit Category`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label required">
                        Category Name
                      </label>
                      <Field name="name" type="text" className="form-control" />
                      <ErrorMessage
                        name="name"
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

export default CategoryEditForm;
