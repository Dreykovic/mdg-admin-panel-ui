const ProductStats = () => {
  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar lg  rounded-1 no-thumbnail bg-secondary color-defult">
                  <i className="icofont-optic fs-4"></i>
                </div>
                <div className="flex-fill ms-4 text-truncate">
                  <div className="text-truncate">In-Store Sales</div>
                  <span className="badge bg-secondary">$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar lg  rounded-1 no-thumbnail bg-secondary color-defult">
                  <i className="icofont-user fs-4"></i>
                </div>
                <div className="flex-fill ms-4 text-truncate">
                  <div className="text-truncate">Website Sales</div>
                  <span className="fw-bold">Sally Graham</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar lg  rounded-1 no-thumbnail bg-secondary color-defult">
                  <i className="icofont-price fs-4"></i>
                </div>
                <div className="flex-fill ms-4 text-truncate">
                  <div className="text-truncate">Discount</div>
                  <span className="badge bg-secondary">$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductStats;
