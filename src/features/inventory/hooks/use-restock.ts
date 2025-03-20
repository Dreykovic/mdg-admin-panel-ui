import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import { useCreateStockMovementMutation } from '@/services/stock-mvt';
import { AppDispatch } from '@/store';
import { ListResponse } from '@/types/api';
import { Inventory, StockMovement } from '@/types/entity';

import { StockMovementData } from '../types';

export const useRestock = (inventory: Inventory) => {
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
  const initialValues: StockMovementData = {
    inventoryId: inventory.id,
    quantity: 0,
    documentNumber: '',
    notes: '',
    productId: inventory.productId,
    movementType: 'INCOMING',
  };
  const handleSubmit = async (values: StockMovementData) => {
    try {
      if (values) {
        const data: StockMovementData = {
          ...values,
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
    }
  };

  return {
    validationSchema,
    handleSubmit,
    initialValues,
  };
};
