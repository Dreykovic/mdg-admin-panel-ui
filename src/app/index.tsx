// src/App.tsx
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthGuard from '@/components/auth/auth-guard'; // Create this component
import Layout from '@/layouts';
import { authRoutesConfig, guestRoutesConfig } from '@/router/config';
import { AppDispatch, RootState } from '@/store';
import { setTheme } from '@/store/slice/theme-slice';

// Create a single router with conditional rendering based on auth state
const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const dispatch = useDispatch<AppDispatch>();

  // Handle theme changes
  useEffect(() => {
    dispatch(setTheme({ theme: currentTheme }));
  }, [currentTheme, dispatch]);

  // Create router dynamically but only once per auth state change
  const router = React.useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        element: <Layout />,
        children: isAuthenticated
          ? Object.values(authRoutesConfig).map(
              ({ path, component: Component, name }) => ({
                path,
                element: (
                  <AuthGuard isAuthenticated={isAuthenticated}>
                    <Component />
                  </AuthGuard>
                ),
                handle: { routeName: name },
              }),
            )
          : Object.values(guestRoutesConfig).map(
              ({ path, component: Component, name }) => ({
                path,
                element: <Component />,
                handle: { routeName: name },
              }),
            ),
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
