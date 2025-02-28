import { FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import { AppDispatch } from '@/store';
import { useEditMarginMutation } from '@/store/api-slice';
import { ApiResponse } from '@/types/api';
import { MarginLevel } from '@/types/entity';

export const useMarginEdit = (handleClose: () => void) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editMargin] = useEditMarginMutation();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required.')
      .max(100, 'Name must be 100 characters or less.'),
    margin: Yup.number().required('Margin is required.'),
  });

  const handleSubmit = async (
    values: Partial<MarginLevel>,
    { setSubmitting }: FormikHelpers<Partial<MarginLevel>>,
  ) => {
    try {
      if (values) {
        const data: Partial<MarginLevel> = {
          id: values.id,
          name: values.name,
          margin: values.margin,
        };

        const response: ApiResponse<MarginLevel> = await editMargin(
          data as MarginLevel,
        ).unwrap();

        if (response.success) {
          dispatch(
            showAlert({
              title: 'Success!',
              message: response.message,
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
          title: 'Error!',
          message:
            'An error occurred during the submission ' +
            (error as any)?.data?.error?.message,
          success: false,
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    validationSchema,
    handleSubmit,
  };
};
