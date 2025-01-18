import React from 'react';

type Props = {};

const ProductStockTabPane = (props: Props) => {
  return (
    <>
      <div className="tab-pane fade" id="grid-view">
        <div className="row clearfix g-3">
          <div className="col-lg-4">
            <div className="card sticky-lg-top">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Contact Add</h6>
              </div>
              <div className="card-body">
                <form>
                  <div className="row g-3 mb-3">
                    <div className="col-sm-12">
                      <label htmlFor="fileimg" className="form-label">
                        Contact Image
                      </label>
                      <input
                        type="File"
                        className="form-control"
                        id="fileimg"
                      />
                    </div>
                    <div className="col-sm-12">
                      <label htmlFor="depone" className="form-label">
                        Person Name
                      </label>
                      <input type="text" className="form-control" id="depone" />
                    </div>
                    <div className="col-sm-12">
                      <label htmlFor="abc" className="form-label">
                        Birthdate
                      </label>
                      <input type="date" className="form-control" id="abc" />
                    </div>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-sm-12">
                      <label htmlFor="deptwo" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="deptwo"
                      />
                    </div>
                    <div className="col-sm-12">
                      <label htmlFor="deptwophone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="deptwophone"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Contact
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row row-cols-sm-1 row-cols-md-2 row-col-lg-3 row-cols-xl-2 row-cols-xxl-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductStockTabPane;
