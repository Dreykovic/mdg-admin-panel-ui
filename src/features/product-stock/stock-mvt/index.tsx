const StockMvt = () => {
  return (
    <div>
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
  );
};

export default StockMvt;
