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
            <div className="d-flex align-items-center justify-content-between mt-5 flex-wrap">
              <div className="lesson_name">
                <span className="medium text-muted project_name fw-bold">
                  {origin.country}
                </span>
                <div
                  className=" bg-secondary"
                  style={{ width: '60px', height: '60px' }}
                >
                  <i
                    className="icofont-bricks d-flex justify-content-center align-items-center"
                    style={{ width: '60px', height: '60px', fontSize: '30px' }}
                  ></i>
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
