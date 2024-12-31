// All components mapping with path for internal routes
//TODO: rendre les routes nommé

import { lazy } from 'react';

import { RoutesConfigType } from '@/types/routes-type';
import CategoriesPage from '@/pages/resources/categories-page';
import SUppliersPage from '@/pages/resources/suppliers-page';
const Login = lazy(() => import('@/pages/login'));
const Home = lazy(() => import('@/pages/home'));
export const authRoutes: RoutesConfigType = {
  home: {
    navLink: 'homeNavId',
    name: 'home',
    path: '/',
    component: <Home />,
    pageName: 'Home',
  },
  category: {
    navLink: 'categoryNavId',

    name: 'category-list',

    path: '/resources/categories',
    component: <CategoriesPage />,
    pageName: 'Categories Page',
  },
  supplier: {
    navLink: 'supplierNavId',

    name: 'supplier-list',

    path: '/resources/suppliers',
    component: <SUppliersPage />,
    pageName: 'Suppliers Page',
  },
};
export const guestRoutes: RoutesConfigType = {
  login: {
    navLink: 'homeNavId',

    name: 'login',
    path: '/', // the url
    component: <Login />, // view rendered
    pageName: '',
  },

  any: {
    navLink: 'homeNavId',

    name: 'any',
    path: '*', // the url
    component: <Login />, // view rendered
    pageName: '',
  },
};
