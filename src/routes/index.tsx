// All components mapping with path for internal routes
//TODO: rendre les routes nommé

import { lazy } from 'react';

import { RoutesConfigType } from '@/types/routes-type';
import CategoriesPage from '@/pages/categories-page';
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

    path: '/categories',
    component: <CategoriesPage />,
    pageName: 'Membres du Personnel',
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
