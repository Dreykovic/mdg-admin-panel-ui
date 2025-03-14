import { useSelector } from 'react-redux';

import Header from '@/components/header';
import SideBar from '@/components/sidebar';
import CustomAlert from '@/components/ui/alerts/alert';
import { RootState } from '@/store';

import AnimatedOutlet from './animate';

const AUTH_MAIN_CLASSNAMES = 'main px-lg-4 px-md-4';
const GUEST_MAIN_CLASSNAMES = 'main p-0';
const AUTH_BODY_CLASSNAMES = 'body d-flex py-lg-3 py-md-2';
const GUEST_BODY_CLASSNAMES = 'body d-flex min-vh-100';

const Layout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const mainClassNames = isAuthenticated
    ? AUTH_MAIN_CLASSNAMES
    : GUEST_MAIN_CLASSNAMES;
  const bodyClassNames = isAuthenticated
    ? AUTH_BODY_CLASSNAMES
    : GUEST_BODY_CLASSNAMES;

  // Fonction pour éviter le rendu conditionnel répété de certains composants
  const renderContent = () => {
    if (isAuthenticated) {
      return <AnimatedOutlet />;
    }

    return (
      <div className="row min-vh-100">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div
            className="card border-0 bg-dark text-light shadow-sm"
            style={{ maxWidth: '450px', width: '100%' }}
          >
            {/* Logo centré au-dessus du formulaire */}
            <div className="text-center pt-4">
              <img
                src="/assets/images/logo.png"
                alt="Company Logo"
                className="img-fluid mb-3"
                style={{ maxHeight: '80px' }}
                onError={(e) => {
                  // Fallback si l'image ne charge pas
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMjRweCIgZmlsbD0id2hpdGUiPkNPTVBBTlk8L3RleHQ+PC9zdmc+';
                }}
              />
            </div>
            <div className="card-body p-4 p-md-5">
              <AnimatedOutlet />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="mytask-layout" className="theme-indigo">
      {isAuthenticated && <SideBar />}
      <div className={mainClassNames}>
        {isAuthenticated && <Header />}
        <div className={bodyClassNames}>
          <div className="container-xxl">
            {renderContent()}
            <CustomAlert />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
