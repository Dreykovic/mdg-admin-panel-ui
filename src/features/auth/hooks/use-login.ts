import { FormikHelpers } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import { makeGlobalLogin } from '@/features/auth/store/slice';
import { AuthResponse } from '@/features/auth/types';
import { AppDispatch } from '@/store';
import { useSignInMutation } from '@/services/auth';
import { ApiResponse } from '@/types/api';

export interface LoginFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();

  const initialValues: LoginFormValues = {
    username: localStorage.getItem('preferredUsername') || '',
    password: '',
    rememberMe: Boolean(localStorage.getItem('preferredUsername')),
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('The username is required'),
    password: Yup.string().required('The password is required'),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      setSubmitting(true);

      if (values) {
        const loginData = {
          username: values.username,
          password: values.password,
        };

        const response: ApiResponse<AuthResponse> =
          await signIn(loginData).unwrap();

        if (response.success) {
          // Store remember me preference
          if (values.rememberMe) {
            localStorage.setItem('preferredUsername', values.username);
          } else {
            localStorage.removeItem('preferredUsername');
          }

          dispatch(
            makeGlobalLogin({
              user: response.content.userData,
              tokens: response.content.tokens,
            }),
          );

          dispatch(
            showAlert({
              title: 'Welcome back!',
              message: `You've successfully logged in`,
            }),
          );

          navigate('/', { replace: true });
        }
      } else {
        throw new Error('No data submitted');
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          title: 'Authentication Failed',
          message:
            (error as any)?.data?.error?.message ||
            'Invalid username or password. Please try again.',
          success: false,
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    showPassword,
    togglePasswordVisibility,
  };
};

export default useLogin;
