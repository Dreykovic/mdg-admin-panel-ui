import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import { AppDispatch } from '@/store';
import { useCreateInventoryMutation } from '@/store/api/inventory';
import { ApiResponse } from '@/types/api';
import { Inventory } from '@/types/entity';

import { CreateInventoryPayload } from '../types';

/**
 * Hook personnalisé pour gérer le formulaire d'inventaire
 * @param onSuccess Callback à appeler en cas de succès
 * @param sku SKU du produit
 * @returns Valeurs initiales, schéma de validation, gestionnaire de soumission et liste des entrepôts
 */
export const useInventoryForm = (onSuccess: () => void, sku: string) => {
  const [createInventory, { isLoading }] = useCreateInventoryMutation();
  const dispatch = useDispatch<AppDispatch>();

  // Valeurs initiales du formulaire
  const initialValues: CreateInventoryPayload = {
    sku,
    warehouseId: '',
    inventoryMetaData: {
      quantity: 0,
      availableQuantity: 0,
      minimumQuantity: 0,
      safetyStockLevel: 0,
      reorderThreshold: 5,
      reorderQuantity: 10,
      leadTimeInDays: 7,
      // economicOrderQuantity: null,
      // unitCost: null,
      valuationMethod: 'FIFO',
      inStock: 'false',
      backOrderable: 'false',
      stockLocation: '',
      notes: '',
    },
  };

  // Schéma de validation Yup
  const validationSchema = Yup.object({
    warehouseId: Yup.string().required('Warehouse is required'),
    inventoryMetaData: Yup.object({
      quantity: Yup.number()
        .required('Quantity is required')
        .min(0, 'Quantity cannot be negative'),
      availableQuantity: Yup.number()
        .nullable()
        .min(0, 'Available quantity cannot be negative'),
      minimumQuantity: Yup.number()
        .nullable()
        .min(0, 'Minimum quantity cannot be negative'),
      safetyStockLevel: Yup.number()
        .nullable()
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
      unitCost: Yup.number().nullable().min(0, 'Unit cost cannot be negative'),
      valuationMethod: Yup.string().oneOf(
        ['FIFO', 'LIFO', 'WAC', 'FEFO'],
        'Invalid valuation method',
      ),
      inStock: Yup.boolean().required('In stock status is required'),
      backOrderable: Yup.boolean().required(
        'Back orderable status is required',
      ),
      stockLocation: Yup.string().nullable(),
      notes: Yup.string()
        .nullable()
        .max(500, 'Notes cannot exceed 500 characters'),
    }),
  });

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (values: CreateInventoryPayload) => {
    try {
      // Normaliser les valeurs du formulaire
      const normalizedValues = {
        ...values,
        inventoryMetaData: {
          ...values.inventoryMetaData,
          // Convertir les chaînes 'true'/'false' en booléens pour l'API
          inStock: values.inventoryMetaData.inStock === 'true',
          backOrderable: values.inventoryMetaData.backOrderable === 'true',
        },
      };

      // Appeler l'API pour créer l'inventaire
      const response: ApiResponse<Inventory> =
        await createInventory(normalizedValues).unwrap();

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
    }
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    isLoading,
  };
};
