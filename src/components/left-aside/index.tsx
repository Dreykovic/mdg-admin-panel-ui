// import Clock from '@/shared/components/ui/clock';
import Logo from '@/assets/images/logo/logo.png';

function LeftAside() {
  return (
    <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100 ">
      <div
        style={{ maxWidth: '25rem' }}
        className=" d-lg-flex flex-column justify-content-center align-items-center rounded-lg "
      >
        <div className="text-center mb-5">
          <img src={Logo} alt="login-img" height={100} />
        </div>
        <div className="mb-5">
          <h2 className="color-900 text-center">
            Welcome to Measured Dry Goods Admin Panel.
          </h2>
          <h3 className="color-500 text-center">
            Log in to access your dashboard, track orders, manage inventory, and
            optimize your sales.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default LeftAside;
