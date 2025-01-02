import { useCallback } from 'react';

import { UnitOfMesure } from '@/types/entity';

interface IUnitRowProps {
  unit: Partial<UnitOfMesure>;
  setUnitId: (arg: number) => void;

  setUpdateInitialValues: (arg: Partial<UnitOfMesure>) => void;
  handleDeleteItemModalShow: () => void;
  handleEditUnitModalShow: () => void;
}

const UnitRow = ({
  unit,
  setUnitId,
  setUpdateInitialValues,
  handleEditUnitModalShow,
  handleDeleteItemModalShow,
}: IUnitRowProps) => {
  const triggerDeletion = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>
      setUnitId(unit?.id as number);
      handleDeleteItemModalShow();
    },
    [setUnitId, handleDeleteItemModalShow, unit],
  );
  const triggerUnitUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>

      const values: Partial<UnitOfMesure> = unit;
      setUpdateInitialValues(values);
      handleEditUnitModalShow();
    },
    [setUpdateInitialValues, handleEditUnitModalShow, unit],
  );
  return (
    <tr>
      <td>{unit.name}</td>
      <td>{(unit.type as string).toLowerCase()}</td>
      <td>{unit.factor}</td>

      <td>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={triggerUnitUpdate}
          >
            <i className="icofont-edit text-success"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary deleterow"
            onClick={triggerDeletion}
          >
            <i className="icofont-ui-delete text-danger"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UnitRow;
