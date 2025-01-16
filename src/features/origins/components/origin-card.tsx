import { useCallback } from 'react';

import { Origin } from '@/types/entity';

interface IOriginProps {
  origin: Partial<Origin>;
  setOriginId: (arg: number) => void;

  setUpdateInitialValues: (arg: Partial<Origin>) => void;
  handleDeleteItemModalShow: () => void;
  handleEditOriginModalShow: () => void;
}
const OriginCard = ({
  origin,
  setOriginId,
  setUpdateInitialValues,
  handleEditOriginModalShow,
  handleDeleteItemModalShow,
}: IOriginProps) => {
  const triggerDeletion = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>
      setOriginId(origin?.id as number);
      handleDeleteItemModalShow();
    },
    [setOriginId, handleDeleteItemModalShow, origin],
  );
  const triggerOriginUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>

      const values: Partial<Origin> = origin;
      setUpdateInitialValues(values);
      handleEditOriginModalShow();
    },
    [setUpdateInitialValues, handleEditOriginModalShow, origin],
  );
  return (
    <>
      <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-4">
        <div className="card shadow">
          <div className="card-body">
            <div className="py-2 d-flex align-items-center border-bottom">
              <div className="d-flex ms-3 align-items-center flex-fill">
                <span className="avatar lg bg-secondary rounded-circle text-center d-flex align-items-center justify-content-center">
                  <i className="icofont-flag fs-5"></i>
                </span>
                <div className="d-flex flex-column ps-3">
                  <h6 className="fw-bold mb-0 small-14">{origin.country}</h6>
                </div>
              </div>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={triggerOriginUpdate}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Edit"
                >
                  <i className="icofont-edit text-primary"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={triggerDeletion}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Delete"
                >
                  <i className="icofont-ui-delete text-primary"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OriginCard;
