import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { useSignInMutation } from '@/store/api-slice';
import { makeGlobalLogin } from '@/features/auth/store/slice';
import { AuthResponse } from '@/features/auth/types';
import { AppDispatch } from '@/store';
import { ApiResponse } from '@/types/api';
interface ILoginFormValues {
  username: string;
  password: string;
}
const Login = () => {
  const initialValues = {
    username: '',
    password: '',
  };
  const validationsSchema = Yup.object({
    username: Yup.string().required('The username is required'),
    password: Yup.string().required('The password is required'),
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [signIn] = useSignInMutation();

  const handleSubmit = async (
    values: ILoginFormValues,
    { setSubmitting }: FormikHelpers<ILoginFormValues>,
  ) => {
    try {
      setSubmitting(true);

      if (values) {
        const response: ApiResponse<AuthResponse> =
          await signIn(values).unwrap();

        if (response.success) {
          dispatch(
            makeGlobalLogin({
              user: response.content.userData,
              tokens: response.content.tokens,
            }),
          );
          navigate('/', { replace: true });
          dispatch(
            showAlert({
              title: 'Success !',
              message: `Login successfully`,
            }),
          );
        }
      } else {
        throw new Error('No data submitted');
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          title: 'Error !',
          message:
            'Sorry An error occurred during submission' +
            (error as any).data.error.message,
          success: false,
        }),
      );
    } finally {
      // navigate('/', { replace: true }); // Évite de revenir à la page de connexion

      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationsSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row g-1 p-3 p-md-4">
              <div className="col-12 text-center mb-1 mb-lg-5">
                <h1>Login</h1>
                <span>Access your account securely.</span>
              </div>

              <div className="col-12">
                <div className="mb-2">
                  <label htmlFor="username" className="form-label required">
                    Username
                  </label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-2">
                  <div className="form-label">
                    <span className="d-flex justify-content-between align-items-center">
                      <label htmlFor="password" className="form-label required">
                        Password
                      </label>
                      {/* <a className="text-secondary" href="#">
                        Forgot your password?
                      </a> */}
                    </span>
                  </div>

                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="col-12 text-center mt-4">
                <LoadingButton
                  isLoading={isSubmitting}
                  text="Login"
                  loadingText="Logging in..."
                  variant="light"
                  type="submit"
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
