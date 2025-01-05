import React, { useCallback } from 'react';

import { Ingredient } from '@/types/entity';

export interface IIngredientProps {
  ingredient: Partial<Ingredient>;
  setIngredientId: (arg: number) => void;

  setUpdateInitialValues: (arg: Partial<Ingredient>) => void;
  handleDeleteItemModalShow: () => void;
  handleEditIngredientModalShow: () => void;
}
const IngredientItem = ({
  ingredient,
  setIngredientId,
  setUpdateInitialValues,
  handleEditIngredientModalShow,
  handleDeleteItemModalShow,
}: IIngredientProps) => {
  const triggerDeletion = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>
      setIngredientId(ingredient?.id as number);
      handleDeleteItemModalShow();
    },
    [setIngredientId, handleDeleteItemModalShow, ingredient],
  );
  const triggerIngredientUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>

      const values: Partial<Ingredient> = ingredient;
      setUpdateInitialValues(values);
      handleEditIngredientModalShow();
    },
    [setUpdateInitialValues, handleEditIngredientModalShow, ingredient],
  );
  return (
    <>
      <li className="row flex-wrap mb-3">
        <div className="col-4">
          <span className="fw-bold">{ingredient.product?.name}</span>
        </div>
        <div className="col-4">
          <span className="text-muted">{`${ingredient.quantity}  ${ingredient.unitOfMeasure?.name}`}</span>
        </div>
        <div className="col-4">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit"
              onClick={triggerIngredientUpdate}
            >
              <i className="icofont-edit text-primary"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary deleterow"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete"
              onClick={triggerDeletion}
            >
              <i className="icofont-ui-delete text-primary"></i>
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default IngredientItem;
