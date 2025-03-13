import { FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import { AppDispatch } from '@/store';
import { useCreateInventoryMutation } from '@/store/api/inventory';
import { ApiResponse } from '@/types/api';

export const useInventoryForm = (handleClose: () => void, sku: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const [createInventory] = useCreateInventoryMutation();

  // 🟢 Valeurs Initiales
  const initialValues = {
    sku: sku,
    inventoryMetaData: {
      quantity: 0,
      reorderThreshold: 0,
      reorderQuantity: 0,
      availableQuantity: 0,
      inStock: false,
      backOrderable: false,
    },
  };

  // 🟠 Validation Yup
  const validationSchema = Yup.object({
    sku: Yup.string().required('SKU is required.'),
    inventoryMetaData: Yup.object({
      quantity: Yup.number().required('Quantity is required.').min(0),
      reorderThreshold: Yup.number().required('Reorder threshold is required.'),
      reorderQuantity: Yup.number().required('Reorder quantity is required.'),
      availableQuantity: Yup.number().required(
        'Available quantity is required.',
      ),
      inStock: Yup.boolean().required(),
      backOrderable: Yup.boolean().required(),
    }),
  });

  // 🔴 Gestion de la soumission
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      const response: ApiResponse<any> = await createInventory(values).unwrap();

      if (response.success) {
        dispatch(
          showAlert({
            title: 'Success!',
            message: `${response.message}`,
          }),
        );
        handleClose();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(
        showAlert({
          title: 'Error!',
          message: 'An error occurred: ' + (error as any).data?.error?.message,
          success: false,
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return { initialValues, validationSchema, handleSubmit };
};
