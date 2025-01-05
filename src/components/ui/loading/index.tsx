import Logo from '@/assets/images/logo/logo.svg';

export const Loading = () => {
  return (
    <>
      <div className="">
        <div className="light-success-bg mb-3 h-100">
          <div className=" text-center ">
            <img src={Logo} className="img-fluid mx-size" alt="No Data" />
          </div>
          <div className=" d-flex align-items-center justify-content-center">
            <div
              className="spinner-grow m-auto"
              style={{ width: '3rem', height: '3rem' }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
