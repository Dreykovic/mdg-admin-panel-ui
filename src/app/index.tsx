// src/App.tsx
import React, { useEffect, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  useNavigate,
  Outlet,
} from 'react-router-dom';

import LoadingFallback from '@/components/ui/loading-fallback';
import Layout from '@/layouts';
import { authRoutesConfig, guestRoutesConfig } from '@/router/config';
import { AppDispatch, RootState } from '@/store';
import { setTheme } from '@/store/slice/theme-slice';

// Wrapper component that handles auth state changes
const AuthStateHandler: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const navigate = useNavigate();

  // Use effect to navigate when auth state changes
  useEffect(() => {
    navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  return <Outlet />;
};

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setTheme({ theme: currentTheme }));
  }, [currentTheme, dispatch]);

  // Define the router outside of render to avoid recreation on every render
  const router = React.useMemo(() => {
    // Create routes based on authentication status
    const authRoutes = Object.values(authRoutesConfig).map(
      ({ path, component: Component, name }) => ({
        path,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Component />
          </Suspense>
        ),
        handle: { routeName: name },
      }),
    );

    const guestRoutes = Object.values(guestRoutesConfig).map(
      ({ path, component: Component, name }) => ({
        path,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Component />
          </Suspense>
        ),
        handle: { routeName: name },
      }),
    );

    return createBrowserRouter([
      {
        element: <AuthStateHandler isAuthenticated={isAuthenticated} />,
        children: [
          {
            path: '/',
            element: <Layout />,
            children: isAuthenticated
              ? [
                  ...authRoutes,
                  // Redirect any unknown routes to home for authenticated users
                  { path: '*', element: <Navigate to="/" replace /> },
                ]
              : [
                  ...guestRoutes,
                  // Redirect any unknown routes to login for guests
                  { path: '*', element: <Navigate to="/" replace /> },
                ],
          },
        ],
      },
    ]);
  }, [isAuthenticated]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
