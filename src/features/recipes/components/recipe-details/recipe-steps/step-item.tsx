import { useCallback } from 'react';

import { Step } from '@/types/entity';

export interface IStepProps {
  step: Partial<Step>;
  setStepId: (arg: number) => void;

  setUpdateInitialValues: (arg: Partial<Step>) => void;
  handleDeleteItemModalShow: () => void;
  handleEditStepModalShow: () => void;
}

const StepItem = ({
  step,
  setStepId,
  setUpdateInitialValues,
  handleEditStepModalShow,
  handleDeleteItemModalShow,
}: IStepProps) => {
  const triggerDeletion = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>
      setStepId(step?.id as number);
      handleDeleteItemModalShow();
    },
    [setStepId, handleDeleteItemModalShow, step],
  );
  const triggerStepUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>

      const values: Partial<Step> = step;
      setUpdateInitialValues(values);
      handleEditStepModalShow();
    },
    [setUpdateInitialValues, handleEditStepModalShow, step],
  );
  return (
    <>
      <li className="dd-item mb-3">
        <div className="dd-handle">
          <div className="task-info d-flex align-items-center justify-content-between">
            <h6 className="bg-secondary py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
              {`Step ${step.stepNumber}`}
            </h6>
            <div className="task-priority d-flex flex-column align-items-center justify-content-center">
              <span className="  text-end mt-1">{`${step.duration} minutes`}</span>
            </div>
          </div>
          <p className="py-2 mb-0">{step.description}</p>
          <div className="tikit-info row g-3 align-items-center">
            <div className="col-sm text-end">
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
                  onClick={triggerStepUpdate}
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
          </div>
        </div>
      </li>
    </>
  );
};

export default StepItem;
