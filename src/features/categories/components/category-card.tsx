import { ProductCategory } from '@/types/entity';
import { useCallback } from 'react';

interface ICategoryProps {
  category: Partial<ProductCategory>;

  setUpdateInitialValues: (arg: Partial<ProductCategory>) => void;
  // handleDeleteItemModalShow: () => void;
  handleEditCategoryModalShow: () => void;
}
const CategoryCard = ({
  category,
  setUpdateInitialValues,
  handleEditCategoryModalShow,
}: ICategoryProps) => {
  const triggerCategoryUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>

      const values: Partial<ProductCategory> = category;
      setUpdateInitialValues(values);
      handleEditCategoryModalShow();
    },
    [setUpdateInitialValues, handleEditCategoryModalShow],
  );
  return (
    <>
      <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mt-5 flex-wrap">
              <div className="lesson_name">
                <span className="medium text-muted project_name fw-bold">
                  {category.name}
                </span>
                <div
                  className=" light-info-bg"
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
                  onClick={triggerCategoryUpdate}
                >
                  <i className="icofont-edit text-success"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteproject"
                >
                  <i className="icofont-ui-delete text-danger"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
