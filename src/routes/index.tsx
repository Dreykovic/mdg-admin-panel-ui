// All components mapping with path for internal routes
//TODO: rendre les routes nommé

import { lazy } from 'react';

import AddProductPage from '@/pages/products/add-product-page';
import CategoriesPage from '@/pages/products/categories-page';
import ProductsPage from '@/pages/products/products-page';
import MarginsPage from '@/pages/settings/margins-page';
import SuppliersPage from '@/pages/settings/suppliers-page';
import UnitsPage from '@/pages/settings/units-page';
import { RoutesConfigType } from '@/types/routes-type';
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

    path: '/products/categories',
    component: <CategoriesPage />,
    pageName: 'Categories Page',
  },
  supplier: {
    navLink: 'supplierNavId',

    name: 'supplier-list',

    path: '/settings/suppliers',
    component: <SuppliersPage />,
    pageName: 'Suppliers Page',
  },
  margin: {
    navLink: 'marginNavId',

    name: 'margin-list',

    path: '/settings/margins',
    component: <MarginsPage />,
    pageName: 'Margins Page',
  },
  unit: {
    navLink: 'unitNavId',

    name: 'unit-list',

    path: '/settings/units',
    component: <UnitsPage />,
    pageName: 'Units Page',
  },
  products: {
    navLink: 'productNavId',

    name: 'product-list',

    path: '/products',
    component: <ProductsPage />,
    pageName: 'Products Page',
  },
  addProduct: {
    navLink: 'addProductNavId',

    name: 'add-product-list',

    path: '/products/add',
    component: <AddProductPage />,
    pageName: 'Product Add Page',
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
