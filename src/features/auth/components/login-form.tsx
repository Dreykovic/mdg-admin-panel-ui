import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Eye, EyeSlash, Lock, Person } from 'react-bootstrap-icons';

import LoadingButton from '@/components/ui/buttons/loading-button';
import { useLogin } from '@/features/auth/hooks/use-login';

const LoginForm = () => {
  const {
    initialValues,
    validationSchema,
    handleSubmit,
    showPassword,
    togglePasswordVisibility,
  } = useLogin();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="bg-white rounded shadow-sm p-1 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Welcome Back</h2>
            <p className="text-muted">Sign in to your account</p>
          </div>

          {/* Username field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <Person />
              </span>
              <Field
                name="username"
                type="text"
                className={`form-control ${
                  touched.username && errors.username ? 'is-invalid' : ''
                }`}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger small mt-1"
            />
          </div>

          {/* Password field */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <a href="#" className="text-primary small text-decoration-none">
                Forgot password?
              </a>
            </div>
            <div className="input-group">
              <span className="input-group-text">
                <Lock />
              </span>
              <Field
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${
                  touched.password && errors.password ? 'is-invalid' : ''
                }`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-group-text"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger small mt-1"
            />
          </div>

          {/* Remember me checkbox */}
          <div className="mb-4">
            <div className="form-check">
              <Field
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="form-check-input"
              />
              <label htmlFor="rememberMe" className="form-check-label">
                Remember me
              </label>
            </div>
          </div>

          {/* Submit button */}
          <div className="d-grid">
            <LoadingButton
              isLoading={isSubmitting}
              text="Sign In"
              loadingText="Signing in..."
              variant="primary"
              type="submit"
              classes="btn-lg py-2"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
