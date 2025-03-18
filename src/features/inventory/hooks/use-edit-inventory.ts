import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import { AppDispatch } from '@/store';
import { useUpdateInventoryMutation } from '@/store/api/inventory';
import { ListResponse } from '@/types/api';
import { Inventory } from '@/types/entity';

import { UpdateInventoryPayload } from '../types';

/**
 * Hook personnalisé pour gérer le formulaire d'inventaire
 * @param onSuccess Callback à appeler en cas de succès
 * @param sku SKU du produit
 * @returns Valeurs initiales, schéma de validation, gestionnaire de soumission et liste des entrepôts
 */
export const useEditInventory = (
  onSuccess: () => void,
  inventory: Inventory,
) => {
  const initialValues: Partial<UpdateInventoryPayload> = {
    minimumQuantity: inventory.minimumQuantity,
    maximumQuantity: inventory.maximumQuantity ?? undefined,
    safetyStockLevel: inventory.safetyStockLevel,
    reorderThreshold: inventory.reorderThreshold,
    reorderQuantity: inventory.reorderQuantity,
    economicOrderQuantity: inventory.economicOrderQuantity ?? undefined,
    leadTimeInDays: inventory.leadTimeInDays ?? undefined,
    unitCost: inventory.unitCost ?? undefined,
    valuationMethod: inventory.valuationMethod,
    inStock: inventory.inStock,
    backOrderable: inventory.backOrderable,
    stockLocation: inventory.stockLocation ?? '',
    notes: inventory.notes ?? '',
    lastStockCheck: inventory.lastStockCheck ?? undefined,
    nextScheduledCheck: inventory.nextScheduledCheck ?? undefined,
    lastReceivedDate: inventory.lastReceivedDate ?? undefined,
    expiryDate: inventory.expiryDate ?? undefined,
  };
  const [updateInventory, { isLoading }] = useUpdateInventoryMutation();
  const dispatch = useDispatch<AppDispatch>();

  // Schéma de validation Yup
  const validationSchema = Yup.object({
    minimumQuantity: Yup.number()
      .nullable()
      .min(0, 'Minimum quantity cannot be negative'),
    safetyStockLevel: Yup.number()
      .required('Safety stock level is required')
      .min(0, 'Safety stock level cannot be negative'),
    reorderThreshold: Yup.number()
      .required('Reorder threshold is required')
      .min(0, 'Reorder threshold cannot be negative'),
    reorderQuantity: Yup.number()
      .required('Reorder quantity is required')
      .min(1, 'Reorder quantity must be at least 1'),
    economicOrderQuantity: Yup.number()
      .nullable()
      .min(0, 'Economic order quantity cannot be negative'),
    leadTimeInDays: Yup.number()
      .nullable()
      .integer('Lead time must be a whole number')
      .min(0, 'Lead time cannot be negative'),

    backOrderable: Yup.boolean().required('Back orderable status is required'),
    stockLocation: Yup.string().nullable(),
    notes: Yup.string()
      .nullable()
      .max(500, 'Notes cannot exceed 500 characters'),
  });

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (values: UpdateInventoryPayload) => {
    try {
      const filteredValues = { ...values };

      // Nettoyage éventuel des champs vides ou inutiles
      Object.keys(filteredValues).forEach((key) => {
        if (filteredValues[key as keyof typeof filteredValues] === '') {
          delete filteredValues[key as keyof typeof filteredValues];
        }
      });

      const response: ListResponse<Inventory> = await updateInventory({
        id: inventory.id,
        body: filteredValues,
      }).unwrap();

      if (response.success) {
        dispatch(
          showAlert({
            title: 'Succuss !',
            message: `${response.message}`,
          }),
        );
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to create inventory:', error);
      dispatch(
        showAlert({
          title: 'Error !',
          message:
            'An error occurred during the submission ' +
            (error as any).data.error.message,
          success: false,
        }),
      );
    }
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    isLoading,
  };
};
