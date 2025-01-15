import Header from '@/components/header';
import LeftAside from '@/components/left-aside';
import SideBar from '@/components/sidebar';
import CustomAlert from '@/components/ui/alerts/alert';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useSelector } from 'react-redux';

import { RootState } from '@/store';

const AUTH_MAIN_CLASSNAMES = 'main px-lg-4 px-md-4';
const GUEST_MAIN_CLASSNAMES = 'main p-2 py-3 p-xl-5 ';
const AUTH_BODY_CLASSNAMES = 'body d-flex py-lg-3 py-md-2';
const GUEST_BODY_CLASSNAMES = 'body d-flex p-0 p-xl-5 ';

const Layout = () => {
  const location = useLocation();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const mainClassNames = isAuthenticated
    ? AUTH_MAIN_CLASSNAMES
    : GUEST_MAIN_CLASSNAMES;
  const bodyClassNames = isAuthenticated
    ? AUTH_BODY_CLASSNAMES
    : GUEST_BODY_CLASSNAMES;
  return (
    <div id="mytask-layout" className="theme-indigo">
      {isAuthenticated && <SideBar />}

      <div className={mainClassNames}>
        {isAuthenticated && <Header />}
        <div className={bodyClassNames}>
          <div className="container-xxl">
            {isAuthenticated ? (
              <>
                <Outlet />
              </>
            ) : (
              <>
                <div className="row g-0">
                  <LeftAside />
                  <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
                    <div
                      className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
                      style={{ maxWidth: '32rem' }}
                    >
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={location.pathname}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.3,
                            ease: [0, 0.71, 0.2, 1.01],
                          }}
                        >
                          <Outlet />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </>
            )}
            <CustomAlert />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
