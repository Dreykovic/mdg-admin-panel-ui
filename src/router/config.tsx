// All components mapping with path for internal routes
//TODO: rendre les routes nommé

import AddProductPage from '@/pages/goods/add-product-page';
import CategoriesPage from '@/pages/goods/categories-page';
import ProductsPage from '@/pages/goods/products-page';
import MarginsPage from '@/pages/goods/margins-page';
import SuppliersPage from '@/pages/goods/suppliers-page';
import RecipeDetailsPage from '@/pages/compositions/recipe-details-page';
import RecipesPage from '@/pages/compositions/recipes-page';
import UnitsPage from '@/pages/goods/units-page';
import { RoutesConfigType } from '@/types/routes-type';
import Home from '@/pages/home';
import Login from '@/pages/login';
import OriginsPage from '@/pages/goods/origins-page';
import Changelog from '@/pages/changelog';
import ProductDetailsPage from '@/pages/goods/product-details-page';

export const authRoutesConfig: RoutesConfigType = {
  home: {
    navLink: 'homeNavId',
    name: 'home',
    path: '/',
    component: Home,
    pageName: 'Home',
  },
  category: {
    navLink: 'categoryNavId',

    name: 'category-list',

    path: '/products/categories',
    component: CategoriesPage,
    pageName: 'Categories Page',
  },
  origin: {
    navLink: 'originNavId',

    name: 'origin-list',

    path: '/product-settings/origins',
    component: OriginsPage,
    pageName: 'Origins Page',
  },
  supplier: {
    navLink: 'supplierNavId',

    name: 'supplier-list',

    path: '/product-settings/suppliers',
    component: SuppliersPage,
    pageName: 'Suppliers Page',
  },
  margin: {
    navLink: 'marginNavId',

    name: 'margin-list',

    path: '/product-settings/margins',
    component: MarginsPage,
    pageName: 'Margins Page',
  },
  unit: {
    navLink: 'unitNavId',

    name: 'unit-list',

    path: '/settings/units',
    component: UnitsPage,
    pageName: 'Units Page',
  },
  products: {
    navLink: 'productNavId',

    name: 'product-list',

    path: '/products',
    component: ProductsPage,
    pageName: 'Products Page',
  },
  productDetails: {
    navLink: 'productDetailsNavId',

    name: 'product-details',

    path: '/products/details/:productId',
    component: ProductDetailsPage,
    pageName: 'Product Details Page',
  },
  addProduct: {
    navLink: 'addProductNavId',

    name: 'add-product-list',

    path: '/products/add',
    component: AddProductPage,
    pageName: 'Product Add Page',
  },

  recipes: {
    navLink: 'recipeNavId',

    name: 'recipe-list',

    path: '/recipes',
    component: RecipesPage,
    pageName: 'Recipes Page',
  },
  recipeEdit: {
    navLink: 'recipeEditNavId',

    name: 'recipe-edit',

    path: '/recipes/edit/:recipeId',
    component: RecipeDetailsPage,
    pageName: 'Recipes Edit',
  },
  changelog: {
    navLink: 'changelogNavId',

    name: 'changelog',

    path: '/changelog',
    component: Changelog,
    pageName: 'changelog',
  },
};
export const guestRoutesConfig: RoutesConfigType = {
  login: {
    navLink: 'homeNavId',

    name: 'login',
    path: '/', // the url
    component: Login, // view rendered
    pageName: '',
  },

  any: {
    navLink: 'homeNavId',

    name: 'any',
    path: '*', // the url
    component: Login, // view rendered
    pageName: '',
  },
};
