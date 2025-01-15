import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { setTheme } from '@/store/theme-slice';

import { authRouter, guestRouter } from '@/router';
import { RouterProvider } from 'react-router-dom';

const App: React.FC = () => {
  const [router, setRouter] = useState(guestRouter);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isAuthenticated) {
      setRouter(authRouter);
    } else {
      setRouter(guestRouter);
    }

    dispatch(setTheme({ theme: currentTheme }));
  }, [isAuthenticated, currentTheme, dispatch]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
