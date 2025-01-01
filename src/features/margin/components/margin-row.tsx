import { useCallback } from 'react';

import { MarginLevel } from '@/types/entity';

interface IMarginRowProps {
  margin: Partial<MarginLevel>;
  setMarginId: (arg: number) => void;

  setUpdateInitialValues: (arg: Partial<MarginLevel>) => void;
  handleDeleteItemModalShow: () => void;
  handleEditMarginModalShow: () => void;
}

const MarginRow = ({
  margin,
  setMarginId,
  setUpdateInitialValues,
  handleEditMarginModalShow,
  handleDeleteItemModalShow,
}: IMarginRowProps) => {
  const triggerDeletion = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>
      setMarginId(margin?.id as number);
      handleDeleteItemModalShow();
    },
    [setMarginId, handleDeleteItemModalShow],
  );
  const triggerMarginUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>

      const values: Partial<MarginLevel> = margin;
      setUpdateInitialValues(values);
      handleEditMarginModalShow();
    },
    [setUpdateInitialValues, handleEditMarginModalShow],
  );
  return (
    <tr>
      <td>{margin.name}</td>
      <td>{margin.margin}</td>

      <td>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={triggerMarginUpdate}
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

export default MarginRow;
