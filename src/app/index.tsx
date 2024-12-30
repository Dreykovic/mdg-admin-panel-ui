import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '@/components/ui/loading';
import Layout from '@/layouts';
import { guestRoutes, authRoutes } from '@/routes';
import RouteProvider from '@/routes/provider';
import { AppDispatch, RootState } from '@/store';
import { setTheme } from '@/store/theme-slice';
import { LayoutType } from '@/types/global';
import { RoutesConfigType } from '@/types/routes-type';
const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [layoutType, setLayoutType] = useState<LayoutType>('GUEST');
  const [routes, setRoutes] = useState<RoutesConfigType>(guestRoutes);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isAuthenticated) {
      setLayoutType('AUTH');
      setRoutes(authRoutes);
    } else {
      setLayoutType('GUEST');
      setRoutes(guestRoutes);
    }

    setInterval(() => {
      setLoading(false);
    }, 1000);
    dispatch(setTheme({ theme: currentTheme }));
  }, [isAuthenticated]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Layout type={layoutType}>
        {loading === false ? <RouteProvider routes={routes} /> : <Loading />}
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
