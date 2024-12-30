import { memo, ReactNode } from 'react';

import Header from '@/components/header';
import LeftAside from '@/components/left-aside';
import SideBar from '@/components/sidebar';
import CustomAlert from '@/components/ui/alerts/alert';
import { LayoutType } from '@/types/global';
const AUTH_MAIN_CLASSNAMES = 'main px-lg-4 px-md-4';
const GUEST_MAIN_CLASSNAMES = 'main p-2 py-3 p-xl-5 ';
const AUTH_BODY_CLASSNAMES = 'body d-flex py-lg-3 py-md-2';
const GUEST_BODY_CLASSNAMES = 'body d-flex p-0 p-xl-5 ';

interface Props {
  children: ReactNode;
  type: LayoutType;
}

const Layout = memo((props: Props) => {
  const isAuthenticated = props.type === 'AUTH';
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
              <> {props.children}</>
            ) : (
              <>
                <div className="row g-0">
                  <LeftAside />
                  <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
                    <div
                      className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
                      style={{ maxWidth: '32rem' }}
                    >
                      {props.children}
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
});

export default Layout;
