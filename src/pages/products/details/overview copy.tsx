import React from 'react';

type Props = {};

const ProductOverviewTabPane = (props: Props) => {
  return (
    <>
      <div className="tab-pane fade show active" id="list-view">
        <div className="row g-3 mb-3 mt-3">
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mt-5">
                  <div className="lesson_name">
                    <div className="project-block light-info-bg">
                      <i className="icofont-paint"></i>
                    </div>
                    <span className="small text-muted project_name fw-bold">
                      {' '}
                      Social Geek Made{' '}
                    </span>
                    <h6 className="mb-0 fw-bold  fs-6  mb-2">UI/UX Design</h6>
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
                <div className="d-flex align-items-center">
                  <div className="avatar-list avatar-list-stacked pt-2"></div>
                </div>
                <div className="row g-2 pt-4">
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
                <div className="dividers-block"></div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h4 className="small fw-bold mb-0">Progress</h4>
                  <span className="small light-danger-bg  p-1 rounded">
                    <i className="icofont-ui-clock"></i> 35 Days Left
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div className="card teacher-card">
              <div className="card-body  d-flex">
                <div className="profile-av pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w220">
                  <img
                    src="assets/images/lg/avatar3.jpg"
                    alt=""
                    className="avatar xl rounded-circle img-thumbnail shadow-sm"
                  />
                  <div className="about-info d-flex align-items-center mt-1 justify-content-center flex-column">
                    <h6 className="mb-0 fw-bold d-block fs-6 mt-2">CEO</h6>
                    <div
                      className="btn-group mt-2"
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
                </div>
                <div className="teacher-info border-start ps-xl-4 ps-md-3 ps-sm-4 ps-4 w-100">
                  <h6 className="mb-0 mt-2  fw-bold d-block fs-6">
                    AgilSoft Tech
                  </h6>
                  <span className="py-1 fw-bold small-11 mb-0 mt-1 text-muted">
                    Ryan Ogden
                  </span>
                  <div className="video-setting-icon mt-3 pt-3 border-top">
                    <p>
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                      ultrices.Vestibulum ante ipsum primis in faucibus orci
                      luctus et ultrices.Vestibulum ante ipsum primis in
                      faucibus orci luctus et ultrices.Vestibulum ante ipsum
                      primis in faucibus orci luctus et ultrices.faucibus orci
                      luctus et ultrices.Vestibulum ante ipsum primis in
                      faucibus orci luctus et ultrices.Vestibulum ante ipsum
                      primis in faucibus orci luctus et ultricesfaucibus orci
                      luctus et ultrices.Vestibulum ante ipsum primis in
                      faucibus orci luctus et ultrices.Vestibulum ante ipsum
                      primis in faucibus orci luctus et ultrices
                    </p>
                  </div>
                  <div className="d-flex flex-wrap align-items-center ct-btn-set">
                    <a
                      href="chat.html"
                      className="btn btn-dark btn-sm mt-1 me-1"
                    >
                      <i className="icofont-ui-text-chat me-2 fs-6"></i>Chat
                    </a>
                    <a href="profile.html" className="btn btn-dark btn-sm mt-1">
                      <i className="icofont-invisible me-2 fs-6"></i>Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-3 mb-3 row-deck">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Employees Availability</h6>
              </div>
              <div className="card-header py-3 d-flex justify-content-between">
                <h6 className="mb-0 fw-bold ">Personal Informations</h6>
                <button
                  type="button"
                  className="btn p-0"
                  data-bs-toggle="modal"
                  data-bs-target="#edit1"
                >
                  <i className="icofont-edit text-primary fs-6"></i>
                </button>
              </div>
              <div className="card-body">
                <div className="row g-4 row-deck">
                  <div className="col-md-6 col-sm-6">
                    <div className="card">
                      <div className="card-body ">
                        <i className="icofont-checked fs-3"></i>
                        <h6 className="mt-3 mb-0 fw-bold small-14">
                          Attendance
                        </h6>
                        <span className="text-muted">400</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="card">
                      <div className="card-body ">
                        <i className="icofont-stopwatch fs-3"></i>
                        <h6 className="mt-3 mb-0 fw-bold small-14">
                          Late Coming
                        </h6>
                        <span className="text-muted">17</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="card">
                      <div className="card-body ">
                        <i className="icofont-ban fs-3"></i>
                        <h6 className="mt-3 mb-0 fw-bold small-14">Absent</h6>
                        <span className="text-muted">06</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="card">
                      <div className="card-body ">
                        <i className="icofont-beach-bed fs-3"></i>
                        <h6 className="mt-3 mb-0 fw-bold small-14">
                          Leave Apply
                        </h6>
                        <span className="text-muted">14</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
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
                        <h6 className="fw-bold mb-0 small-14">
                          Natalie Gibson
                        </h6>
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
                        <h6 className="fw-bold mb-0 small-14">
                          Victoria Vbell
                        </h6>
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
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h6 className="fw-bold mb-3 text-danger">Bug Image Atteched</h6>
                <div className="flex-grow-1">
                  <div className="py-2 d-flex align-items-center border-bottom">
                    <div className="d-flex ms-3 align-items-center flex-fill">
                      <span className="avatar lg light-danger-bg rounded-circle text-center d-flex align-items-center justify-content-center">
                        <i className="icofont-bug fs-5"></i>
                      </span>
                      <div className="d-flex flex-column ps-3">
                        <h6 className="fw-bold mb-0 small-14">Image3.jpg</h6>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn light-danger-bg text-end"
                    >
                      Download
                    </button>
                  </div>
                  <div className="py-2 d-flex align-items-center border-bottom">
                    <div className="d-flex ms-3 align-items-center flex-fill">
                      <span className="avatar lg light-danger-bg rounded-circle text-center d-flex align-items-center justify-content-center">
                        <i className="icofont-bug fs-5"></i>
                      </span>
                      <div className="d-flex flex-column ps-3">
                        <h6 className="fw-bold mb-0 small-14">Image4.jpg</h6>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn light-danger-bg text-end"
                    >
                      Download
                    </button>
                  </div>
                  <div className="py-2 d-flex align-items-center border-bottom">
                    <div className="d-flex ms-3 align-items-center flex-fill">
                      <span className="avatar lg light-danger-bg rounded-circle text-center d-flex align-items-center justify-content-center">
                        <i className="icofont-bug fs-5"></i>
                      </span>
                      <div className="d-flex flex-column ps-3">
                        <h6 className="fw-bold mb-0 small-14">Image6.jpg</h6>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn light-danger-bg text-end"
                    >
                      Download
                    </button>
                  </div>
                  <div className="py-2 d-flex align-items-center">
                    <div className="d-flex ms-3 align-items-center flex-fill">
                      <span className="avatar lg light-danger-bg rounded-circle text-center d-flex align-items-center justify-content-center">
                        <i className="icofont-bug fs-5"></i>
                      </span>
                      <div className="d-flex flex-column ps-3">
                        <h6 className="fw-bold mb-0 small-14">Image1.jpg</h6>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn light-danger-bg text-end"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-3 mb-3 row-deck">
          <div className="col-md-12 col-lg-8 col-xl-7 col-xxl-7">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-12 col-md-5 col-lg-6 order-md-2 ">
                    <div className="text-center p-4">
                      <img
                        src="assets/images/task-view.svg"
                        alt="..."
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-7 col-lg-6 order-md-1 px-4">
                    <h3 className="fw-bold ">Dylan Hunter</h3>
                    <p className="line-height-custom">
                      Welcome back Dylan Hunter.Integer molestie, arcu non porta
                      sollicitudin, arcu felis aliquam urna, placerat maximus
                      lorem urna commodo sem. Pellentesque venenatis leo quam,
                      sed mattis sapien lobortis ut.placerat maximus lorem urna
                      commodo sem
                    </p>
                    <a
                      className="btn bg-secondary text-light btn-lg lift"
                      href="http://pixelwibes.com/"
                      target="_blank"
                    >
                      Free Inquire
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 col-xl-5 col-xxl-5">
            <div className="alert alert-primary p-3 mb-0 w-100">
              <h6 className="fw-bold mb-1">Create Project Credentials</h6>
              <p className="small mb-4">
                Create a Project credentials now and never miss
              </p>
              <div className="my-3 ">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Username"
                />
              </div>
              <div className="my-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter Password"
                />
              </div>
              <div className="my-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                />
              </div>
              <button className="btn btn-primary mt-2">
                Create Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOverviewTabPane;
