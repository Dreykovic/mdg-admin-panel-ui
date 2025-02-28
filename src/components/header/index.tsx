// import Clock from '@/shared/components/ui/clock';

import { List, XCircle } from 'react-bootstrap-icons';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { makeGlobalLogout } from '@/features/auth/store/slice';
import { AppDispatch, RootState } from '@/store';
import { useSignOutMutation } from '@/store/api-slice';
import authUtil from '@/utils/auth-utils';

import { closeSidebar, openSidebar } from '../sidebar/sidebar-slice';
import { showAlert } from '../ui/alerts/alert-slice';

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpened } = useSelector((state: RootState) => state.sidebar);
  const toggleSidebar = () => {
    if (isOpened) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  };
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation();
  const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const values = { token: authUtil.getRefreshToken() ?? '' };
      dispatch(makeGlobalLogout());
      navigate('/', { replace: true });
      dispatch(
        showAlert({
          title: 'Success !',
          message: `Logout successfully`,
        }),
      );
      if (values) {
        await signOut(values).unwrap();
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
            (error as any).data.error.message,
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
                <small>{authUser?.profiles}</small>
              </div>
              <span
                className="nav-link dropdown-toggle pulse p-0 text-black"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-display="static"
              >
                <Icon.Person className="avatar lg rounded-circle img-thumbnail" />
              </span>
              <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                <div className="card border-0 w280">
                  <div className="card-body pb-0">
                    <div className="d-flex py-1">
                      <Icon.Person className="avatar  rounded-circle " />
                      <div className="flex-fill ms-3">
                        <p className="mb-0">
                          <span className="font-weight-bold">
                            {authUser?.username}
                          </span>
                        </p>
                        <small className="">{authUser?.email}</small>
                      </div>
                    </div>

                    <div>
                      <div>
                        <hr className="dropdown-divider border-dark" />
                      </div>
                    </div>
                    <div className="list-group m-2 ">
                      <a
                        href="#"
                        className="list-group-item list-group-item-action border-0 "
                        onClick={handleSignOut}
                      >
                        <i className="icofont-logout fs-6 me-3"></i>Signout
                      </a>
                      <div>
                        <hr className="dropdown-divider border-dark" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
