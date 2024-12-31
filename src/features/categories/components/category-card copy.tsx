import { ProductCategory } from '@/types/entity';

interface ICategoryProps {
  category: Partial<ProductCategory>;
}
const CategoryCard = ({ category }: ICategoryProps) => {
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
                  data-bs-toggle="modal"
                  data-bs-target="#editproject"
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

            {/* <div className="row g-2 pt-4">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <i className="icofont-paper-clip"></i>
                  <span className="ms-2">5 Attach</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <i className="icofont-sand-clock"></i>
                  <span className="ms-2">4 Month</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <i className="icofont-group-students "></i>
                  <span className="ms-2">5 Members</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <i className="icofont-ui-text-chat"></i>
                  <span className="ms-2">10</span>
                </div>
              </div>
            </div>
            <div className="customer-like mt-5">
              <h6 className="mb-0 fw-bold ">What Customers Like</h6>
              <ul className="list-group mt-3">
                <li className="list-group-item d-flex">
                  <div className="number border-end pe-2 fw-bold">
                    <strong className="color-light-success">1</strong>
                  </div>
                  <div className="cs-text flex-fill ps-2">
                    <span>Fun Factor</span>
                  </div>
                  <div className="vote-text">
                    <span className="text-muted">72 votes</span>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="number border-end pe-2 fw-bold">
                    <strong className="color-light-success">2</strong>
                  </div>
                  <div className="cs-text flex-fill ps-2">
                    <span>Great Value</span>
                  </div>
                  <div className="vote-text">
                    <span className="text-muted">52 votes</span>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="number border-end pe-2 fw-bold">
                    <strong className="color-light-success">3</strong>
                  </div>
                  <div className="cs-text flex-fill ps-2">
                    <span>My Task</span>
                  </div>
                  <div className="vote-text">
                    <span className="text-muted">35 votes</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="dividers-block"></div>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h4 className="small fw-bold mb-0">Progress</h4>
              <span className="small light-danger-bg  p-1 rounded">
                <i className="icofont-ui-clock"></i> 35 Days Left
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
