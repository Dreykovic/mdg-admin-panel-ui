import { FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import { useCreateStockMovementMutation } from '@/services/stock-mvt';
import { AppDispatch } from '@/store';
import { ListResponse } from '@/types/api';
import { Inventory, StockMovement } from '@/types/entity';

import { StockMovementData } from '../types';

export const useRestock = (handleClose: () => void, inventory: Inventory) => {
  const dispatch = useDispatch<AppDispatch>();
  const [createStockMvt] = useCreateStockMovementMutation();

  const validationSchema = Yup.object().shape({
    inventoryId: Yup.string().required('Inventory ID is required'),

    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Quantity must be positive')
      .integer('Quantity must be a whole number'),

    documentNumber: Yup.string().required('Supplier order is required'),

    notes: Yup.string()
      .nullable()
      .max(500, 'Notes cannot exceed 500 characters'),
  });

  const handleSubmit = async (
    values: StockMovementData,
    { setSubmitting }: FormikHelpers<StockMovementData>,
  ) => {
    try {
      if (values) {
        const data: StockMovementData = {
          quantity: values.quantity,
          documentNumber: values.documentNumber,
          notes: values.notes,
          inventoryId: inventory.id,
          productId: inventory.productId,
          movementType: 'INCOMING',
        };

        const response: ListResponse<StockMovement> =
          await createStockMvt(data).unwrap();

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
