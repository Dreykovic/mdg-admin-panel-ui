// import Clock from '@/shared/components/ui/clock';

import { List, XCircle } from 'react-bootstrap-icons';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '@/store';

import { closeSidebar, openSidebar } from '../sidebar/sidebar-slice';
import { makeGlobalLogout } from '@/features/auth/store/slice';
import { useSignOutMutation } from '@/features/auth/store/api';
import { showAlert } from '../ui/alerts/alert-slice';
import authUtil from '@/utils/auth-utils';

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpened } = useSelector((state: RootState) => state.sidebar);
  const toggleSidebar = () => {
    isOpened ? dispatch(closeSidebar()) : dispatch(openSidebar());
  };
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation();
  const handleSignOut = async () => {
    try {
      const values = { token: authUtil.getRefreshToken() ?? '' };
      if (values) {
        const response = await signOut(values).unwrap();
        if (response.success) {
          dispatch(makeGlobalLogout());
          navigate('/', { replace: true });
          dispatch(
            showAlert({
              title: 'Success !',
              message: `Logout successfully`,
            }),
          );
        }
      } else {
        throw new Error('No data submitted');
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          title: 'Erreur !',
          message:
            'Sorry An error occurred during submission' +
            (error as any).data.message,
          success: false,
        }),
      );
    }
  };
  const { authUser } = useSelector((state: RootState) => state.auth);
  return (
    <div className="header">
      <nav className="navbar py-4">
        <div className="container-xxl">
          <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">
            <div className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center zindex-popover">
              <div className="u-info me-2">
                <p className="mb-0 text-end line-height-sm ">
                  <span className="font-weight-bold">{authUser?.username}</span>
                </p>
                <small>Admin Profile</small>
              </div>
              <span
                className="nav-link pulse p-0"
                role="button"
                onClick={() => {
                  // navigate(`${authRoutes.employee.path}/1`);
                  handleSignOut();
                }}
              >
                <Icon.Person className="avatar lg rounded-circle img-thumbnail text-primary" />
              </span>
            </div>
          </div>
          {isOpened ? (
            <button
              className="navbar-toggler p-0 border-0 menu-toggle order-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainHeader"
              onClick={toggleSidebar}
            >
              <XCircle />
            </button>
          ) : (
            <button
              className="navbar-toggler p-0 border-0 menu-toggle order-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainHeader"
              onClick={toggleSidebar}
            >
              <List />
            </button>
          )}
          <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-0 ">
            <div className="input-group flex-nowrap input-group-lg">
              <button
                type="button"
                className="input-group-text"
                id="addon-wrapping"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <Icon.ArrowLeft />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
