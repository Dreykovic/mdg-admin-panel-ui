// All components mapping with path for internal routes
//TODO: rendre les routes nommé

import AddProductPage from '@/pages/products/add-product-page';
import CategoriesPage from '@/pages/products/categories-page';
import ProductsPage from '@/pages/products/products-page';
import MarginsPage from '@/pages/products/settings/margins-page';
import SuppliersPage from '@/pages/products/settings/suppliers-page';
import RecipeDetailsPage from '@/pages/recipes/recipe-details-page';
import RecipesPage from '@/pages/recipes/recipes-page';
import UnitsPage from '@/pages/units-page';
import { RoutesConfigType } from '@/types/routes-type';
import Home from '@/pages/home';
import Login from '@/pages/login';
import OriginsPage from '@/pages/products/settings/origins-page';
import Changelog from '@/pages/changelog';
import ProductDetailsPage from '@/pages/products/details';

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

    path: '/recipes/edit',
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
