// src/App.tsx
import React, { useEffect, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthGuard from '@/components/auth/auth-guard';
import LoadingFallback from '@/components/ui/loading-fallback';
import Layout from '@/layouts';
import { authRoutesConfig, guestRoutesConfig } from '@/router/config';
import { AppDispatch, RootState } from '@/store';
import { setTheme } from '@/store/slice/theme-slice';

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
                    <Suspense fallback={<LoadingFallback />}>
                      <Component />
                    </Suspense>
                  </AuthGuard>
                ),
                handle: { routeName: name },
              }),
            )
          : Object.values(guestRoutesConfig).map(
              ({ path, component: Component, name }) => ({
                path,
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <Component />
                  </Suspense>
                ),
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
