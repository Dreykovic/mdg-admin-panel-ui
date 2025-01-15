import Layout from '@/layouts';
import { createBrowserRouter } from 'react-router-dom';
import { authRoutesConfig, guestRoutesConfig } from './config';

export const authRouter = createBrowserRouter([
  {
    id: 'root',
    path: '/',

    Component: Layout,
    children: Object.keys(authRoutesConfig).map((key) => ({
      path: authRoutesConfig[key].path,
      Component: authRoutesConfig[key].component,
    })),
  },
]);
export const guestRouter = createBrowserRouter([
  {
    id: 'root',
    path: '/',

    Component: Layout,
    children: Object.keys(guestRoutesConfig).map((key) => ({
      path: guestRoutesConfig[key].path,
      Component: guestRoutesConfig[key].component,
    })),
  },
]);
