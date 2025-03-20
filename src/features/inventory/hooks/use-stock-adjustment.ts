import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import { useCreateStockMovementMutation } from '@/services/stock-mvt';
import { AppDispatch } from '@/store';
import { ListResponse } from '@/types/api';
import { StockMovement } from '@/types/entity';

import { StockMovementData } from '../types';

export const useStockAdjustment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [createStockMvt] = useCreateStockMovementMutation();

  // Définition des types d'énumération (à remplacer par vos importations réelles)
  const MovementTypes = [
    'INCOMING',
    'OUTGOING',
    'TRANSFER',
    'ADJUSTMENT',
    'RETURN',
  ];

  const validationSchema = Yup.object().shape({
    // Champs obligatoires
    inventoryId: Yup.string().required("L'ID de l'inventaire est requis"),

    productId: Yup.string().required("L'ID du produit est requis"),

    quantity: Yup.number()
      .required('La quantité est requise')
      .integer('La quantité doit être un nombre entier')
      .min(0, 'La quantité ne peut pas être négative'),

    movementType: Yup.string()
      .required('Le type de mouvement est requis')
      .oneOf(MovementTypes, 'Type de mouvement invalide'),

    // Champs optionnels
    unitCost: Yup.number()
      .nullable()
      .min(0, 'Le coût unitaire ne peut pas être négatif'),

    reason: Yup.string().nullable(),

    status: Yup.string().nullable(),

    notes: Yup.string()
      .nullable()
      .max(500, 'Les notes ne peuvent pas dépasser 500 caractères'),

    lotNumber: Yup.string()
      .nullable()
      .max(100, 'Le numéro de lot ne peut pas dépasser 100 caractères'),

    expiryDate: Yup.date()
      .nullable()
      .min(new Date(), "La date d'expiration ne peut pas être dans le passé"),

    batchId: Yup.string().nullable(),

    isAdjustment: Yup.boolean().nullable(),

    documentNumber: Yup.string()
      .nullable()
      .max(100, 'Le numéro de document ne peut pas dépasser 100 caractères'),

    metadata: Yup.object().nullable(),

    scheduledAt: Yup.date().nullable(),

    sourceWarehouseId: Yup.string()
      .nullable()
      .when('movementType', {
        is: 'TRANSFER',
        then: (schema) =>
          schema.required(
            "L'entrepôt source est requis pour ce type de mouvement",
          ),
      }),

    destinationWarehouseId: Yup.string()
      .nullable()
      .when('movementType', {
        is: 'TRANSFER',
        then: (schema) =>
          schema.required(
            "L'entrepôt de destination est requis pour un transfert",
          ),
      }),

    createdById: Yup.string().nullable(),

    approvedById: Yup.string().nullable(),

    referenceType: Yup.string().nullable(),

    referenceId: Yup.string().nullable(),
  });

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
  };
};
