const ProductInventory = () => {
  return (
    <>
      <div className="row clearfix g-3">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Contact Add</h6>
            </div>
            <div className="card-body"></div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card mb-3">
            <div className="card-body">
              <table
                id="myProjectTable"
                className="table table-hover align-middle mb-0"
                style={{ width: '100%' }}
              >
                <thead>
                  <tr>
                    <th>Person Name</th>
                    <th>Birthdate</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        className="avatar rounded-circle"
                        src="assets/images/xs/avatar2.jpg"
                        alt=""
                      />
                      <span className="fw-bold ms-1">Ryan Randall</span>
                    </td>
                    <td>12/03/2021</td>
                    <td>RyanRandall@gmail.com</td>
                    <td>617-555-0164</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#expedit"
                        >
                          <i className="icofont-edit text-success"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary deleterow"
                        >
                          <i className="icofont-ui-delete text-danger"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInventory;
