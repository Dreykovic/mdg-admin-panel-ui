import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Modal, ModalProps } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { AppDispatch, RootState } from '@/store';
import { useCreateRecipeMutation } from '@/store/api-slice';
import { ApiResponse } from '@/types/api';
import { Recipe } from '@/types/entity';

const RecipeCreateForm = ({ show, handleClose }: ModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const initialValues: Partial<Recipe> = {
    name: 'ddd',
    description: '',
    preparationTime: 10,
    cookingTime: 10,
    servings: 1,
    difficulty: 'EASY', // Valeur par défaut parmi les options disponibles
    userId: authUser?.id as string,
  };

  const validationsSchema = Yup.object({
    name: Yup.string()
      .required('Name is required.')
      .min(3, 'Name must be at least 3 characters long.')
      .max(100, 'Name must not exceed 100 characters.'),
    description: Yup.string()
      .max(500, 'Description must not exceed 500 characters.')
      .nullable(),
    preparationTime: Yup.number()
      .required('Preparation time is required.')
      .integer('Preparation time must be a whole number.')
      .positive('Preparation time must be greater than 0.'),
    cookingTime: Yup.number()
      .required('Cooking time is required.')
      .integer('Cooking time must be a whole number.')
      .positive('Cooking time must be greater than 0.'),
    servings: Yup.number()
      .required('Servings is required.')
      .integer('Servings must be a whole number.')
      .positive('Servings must be greater than 0.'),

    difficulty: Yup.string()
      .required('Difficulty is required.')
      .oneOf(
        ['EASY', 'MEDIUM', 'HARD'],
        'Difficulty must be one of: easy, medium, hard.',
      ),
    userId: Yup.string().required('Author is required.'),
  });

  const [createRecipe] = useCreateRecipeMutation();

  const handleSubmit = async (
    values: Partial<Recipe>,
    { setSubmitting }: FormikHelpers<Partial<Recipe>>,
  ) => {
    try {
      if (values) {
        const data: Partial<Recipe> = {
          ...values,
        };

        const response: ApiResponse<Recipe> = await createRecipe(data).unwrap();

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
                <Modal.Title>{`Create Recipe`}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-content">
                  <div className="modal-body">
                    {/* Step Details */}
                    <h5 className="mb-4">Recipe Details</h5>
                    <div className="row">
                      {/* Step Name */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label required">
                          Recipe Name
                        </label>
                        <Field
                          name="name"
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Difficulty */}
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="difficulty"
                          className="form-label required"
                        >
                          Difficulty
                        </label>
                        <Field
                          name="difficulty"
                          as="select"
                          className="form-select"
                        >
                          <option value="">Select Difficulty</option>
                          <option value="EASY">Easy</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="HARD">Hard</option>
                        </Field>
                        <ErrorMessage
                          name="difficulty"
                          component="div"
                          className="text-danger"
                        />
                      </div>
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

                    {/* Time Details */}
                    <h5 className="mb-4">Time Details</h5>
                    <div className="row">
                      {/* Preparation Time */}
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="preparationTime"
                          className="form-label required"
                        >
                          Preparation Time (minutes)
                        </label>
                        <Field
                          name="preparationTime"
                          type="number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="preparationTime"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Cooking Time */}
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="cookingTime"
                          className="form-label required"
                        >
                          Cooking Time (minutes)
                        </label>
                        <Field
                          name="cookingTime"
                          type="number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="cookingTime"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    {/* Additional Details */}
                    <h5 className="mb-4">Additional Details</h5>
                    <div className="row">
                      {/* Servings */}
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="servings"
                          className="form-label required"
                        >
                          Servings
                        </label>
                        <Field
                          name="servings"
                          type="number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="servings"
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

export default RecipeCreateForm;
