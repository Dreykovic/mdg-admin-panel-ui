import React from 'react';

type Props = {};

const ProductOrganizeCard = (props: Props) => {
  return (
    <>
      <div className="card shadow">
        <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
          <h6 className="mb-0 fw-bold ">Upcomming Interviews</h6>
        </div>
        <div className="card-body">
          <div className="flex-grow-1">
            <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
              <div className="d-flex align-items-center flex-fill">
                <img
                  className="avatar lg rounded-circle img-thumbnail"
                  src="assets/images/lg/avatar2.jpg"
                  alt="profile"
                />
                <div className="d-flex flex-column ps-3">
                  <h6 className="fw-bold mb-0 small-14">Natalie Gibson</h6>
                  <span className="text-muted">Ui/UX Designer</span>
                </div>
              </div>
              <div className="time-block text-truncate">
                <i className="icofont-clock-time"></i> 1.30 - 1:30
              </div>
            </div>
            <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
              <div className="d-flex align-items-center flex-fill">
                <img
                  className="avatar lg rounded-circle img-thumbnail"
                  src="assets/images/lg/avatar9.jpg"
                  alt="profile"
                />
                <div className="d-flex flex-column ps-3">
                  <h6 className="fw-bold mb-0 small-14">Peter Piperg</h6>
                  <span className="text-muted">Web Design</span>
                </div>
              </div>
              <div className="time-block text-truncate">
                <i className="icofont-clock-time"></i> 9.00 - 1:30
              </div>
            </div>
            <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
              <div className="d-flex align-items-center flex-fill">
                <img
                  className="avatar lg rounded-circle img-thumbnail"
                  src="assets/images/lg/avatar12.jpg"
                  alt="profile"
                />
                <div className="d-flex flex-column ps-3">
                  <h6 className="fw-bold mb-0 small-14">Robert Young</h6>
                  <span className="text-muted">PHP Developer</span>
                </div>
              </div>
              <div className="time-block text-truncate">
                <i className="icofont-clock-time"></i> 1.30 - 2:30
              </div>
            </div>
            <div className="py-2 d-flex align-items-center flex-wrap">
              <div className="d-flex align-items-center flex-fill">
                <img
                  className="avatar lg rounded-circle img-thumbnail"
                  src="assets/images/lg/avatar8.jpg"
                  alt="profile"
                />
                <div className="d-flex flex-column ps-3">
                  <h6 className="fw-bold mb-0 small-14">Victoria Vbell</h6>
                  <span className="text-muted">IOS Developer</span>
                </div>
              </div>
              <div className="time-block text-truncate">
                <i className="icofont-clock-time"></i> 2.00 - 3:30
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOrganizeCard;
